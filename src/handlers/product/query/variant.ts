import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import { PRODUCT_VARIANT_ATTRIBUTES_COLLECTION } from "@/pocketbase/constants";
import { getListVariantProductFilePocket } from "@/pocketbase/file/variant/list";
import { listVariantAttributeProductPocket } from "@/pocketbase/product/variant/attribute/list";
import type { FileType } from "@/types/file";
import type {
	AttributeType,
	ProductVariantDataType,
	VariantDataType,
	VariantType,
} from "@/types/product";

export type VariantAttributeExpand = {
	id: string;
	expand?: {
		attribute?: AttributeType;
		attribute_value?: { id: string; name: string };
		variant?: VariantType;
	};
};

export type VariantFileExpand = {
	id: string;
	variant: string;
	file: string;
	expand: {
		file: {
			id: string;
			collectionName: string;
			file: { id: string };
			// other file fields if needed
		};
	};
};

const formatProductVariantData = (
	variants: VariantAttributeExpand[],
	files?: Record<string, FileType>,
): ProductVariantDataType => {
	const attributeMap = new Map<string, AttributeType>();
	const variantGroups = new Map<string, VariantDataType>();

	variants.forEach((record) => {
		const attr = record.expand?.attribute;
		const attrValue = record.expand?.attribute_value;
		const variant = record.expand?.variant;
		if (!attr || !attrValue || !variant) return;

		if (!attributeMap.has(attr.id)) {
			attributeMap.set(attr.id, {
				id: attr.id,
				name: attr.name,
				options: {},
			});
		}
		const pa = attributeMap.get(attr.id);
		if (!pa) return;

		pa.options[attrValue.id] = {
			id: attrValue.id,
			name: attrValue.name,
		};

		if (!variantGroups.has(variant.id)) {
			variantGroups.set(variant.id, {});
		}

		const file = files?.[variant.id];
		const group = variantGroups.get(variant.id);
		if (!group) return;

		group[attrValue.id] = {
			option: {
				id: attrValue.id,
				name: attrValue.name,
			},
			variant: {
				id: variant.id,
				price: variant.price,
				discount: Number(variant.discount) * 100,
				stock: variant.stock,
				sku: variant.sku,
				image: file?.id ? [file] : [],
			},
		};
	});

	return {
		attributes: Object.fromEntries(attributeMap),
		variants: Object.fromEntries(variantGroups),
	};
};

const formatFiles = (data: VariantFileExpand[]): Record<string, FileType> => {
	const imageMap = new Map<string, FileType>();
	data.forEach((record) => {
		const variantId = record?.variant;
		const file = record.expand?.file;
		if (!variantId || !file) return;

		const image: FileType = {
			id: file.id,
			url: convertToFileUrl(file) ?? "",
		};

		if (!imageMap.has(variantId)) {
			imageMap.set(variantId, image);
		}
	});
	return Object.fromEntries(imageMap);
};

export const productVariantQueryOptions = (productId: string) =>
	queryOptions({
		queryKey: [PRODUCT_VARIANT_ATTRIBUTES_COLLECTION, productId],
		queryFn: async () => {
			const variants = await listVariantAttributeProductPocket(productId);
			const files = await getListVariantProductFilePocket(productId);
			return { variants, files };
		},
		select(data) {
			const { variants, files } = data;
			const fileMap = formatFiles(files);
			const formatted = formatProductVariantData(variants, fileMap);
			return formatted;
		},
	});
