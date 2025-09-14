import { updateVariantFileProductHandler } from "@/app/file/handler/mutation/variant";
import type { ProductVariantDataType } from "@/app/product/components/form/schema";
import { createAttributeHandler } from "@/app/product/handler/mutation/attribute/create";
import { normalizeVariantProductFormData } from "@/app/product/handler/mutation/normalize";
import { createOptionHandler } from "@/app/product/handler/mutation/option/create";
import {
  type CreateVariantFilePayload,
  createVariantFilePocket,
} from "@/pocketbase/file/variant/create";
import {
  type CreateVariantAttributePayload,
  createVariantAttributePocket,
} from "@/pocketbase/product/variant/attribute/create";
import { deleteAttributeHandler } from "./attribute/delete";
import { updateAttributeHandler } from "./attribute/update";
import { deleteOptionHandler } from "./option/delete";
import { updateOptionHandler } from "./option/update";
import { createVariantHandler } from "./variant/create";
import { deleteVariantHandler } from "./variant/delete";
import { updateVariantHandler } from "./variant/update";

async function batchVariantHandler(
	data: ProductVariantDataType,
	productId: string,
) {
	const { attributes, options, variants } =
		normalizeVariantProductFormData(data);

	const addedAttributes = attributes.filter((attr) => attr.status === "new");
	const addedOptions = options.filter((opt) => opt.status === "new");
	const addedVariants = variants.filter((v) => v.status === "new");

	const updatedAttributes = attributes.filter(
		(attr) => attr.status === "updated",
	);
	const updatedOptions = options.filter((opt) => opt.status === "updated");
	const updatedVariants = variants.filter((v) => v.status === "updated");

	const deletedAttributeIds = attributes
		.filter((attr) => attr.status === "removed")
		.map((a) => a.id);
	const deletedOptionIds = options
		.filter((opt) => opt.status === "removed")
		.map((o) => o.id);
	const deletedVariantIds = variants
		.filter((v) => v.status === "removed")
		.map((v) => v.id);

	updateAttributeHandler(updatedAttributes);
	updateOptionHandler(updatedOptions);
	updateVariantHandler(updatedVariants);
	updateVariantFileProductHandler(productId, updatedVariants);

	deleteAttributeHandler(deletedAttributeIds);
	deleteOptionHandler(deletedOptionIds);
	deleteVariantHandler(deletedVariantIds);

	const attributeIdMap = await createAttributeHandler(
		addedAttributes,
		productId,
	);

	const { optionIdMap, attributeOptionIdMap } = await createOptionHandler(
		addedOptions,
		attributeIdMap,
	);

	const variantIdMap = await createVariantHandler(addedVariants, productId);

	const variantFilesPayload: CreateVariantFilePayload[] = addedVariants.map(
		(v) => {
			const payload: CreateVariantFilePayload = {
				variantId: variantIdMap[v.id],
				fileId: v.image?.[0]?.id ?? "",
			};
			return payload;
		},
	);
	createVariantFilePocket(variantFilesPayload);

	const createVariantAttrPayload = addedVariants.flatMap((v) => {
		const payload: CreateVariantAttributePayload[] = v.optionIds.map(
			(optId) => {
				const body: CreateVariantAttributePayload = {
					variant: variantIdMap[v.id],
					attribute_value: optionIdMap[optId],
					attribute: attributeIdMap[attributeOptionIdMap[optId]],
				};
				return body;
			},
		);
		return payload;
	});

	createVariantAttributePocket(createVariantAttrPayload);
}

export { batchVariantHandler };
