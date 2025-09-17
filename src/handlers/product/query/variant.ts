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
} from "@/types/product";

const formatProductVariantData = (
	variants: any[],
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
		const pa = attributeMap.get(attr.id)!;

		pa.options[attrValue.id] = {
			id: attrValue.id,
			name: attrValue.name,
		};

		if (!variantGroups.has(variant.id)) {
			variantGroups.set(variant.id, {});
		}

		const file = files?.[variant.id];

		variantGroups.get(variant.id)![attrValue.id] = {
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

const formatFiles = (data: any[]) => {
	const imageMap = new Map<string, FileType>();
	data.forEach((record) => {
		const variantId = record?.variant;
		const file = record.expand.file;
		const image: FileType = {
			id: record.file,
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
