import { createVariantFilePocket } from "@/features/media/pocketbase/variant/create";
import type { VariantNormalizeType } from "@/features/product/handler/mutation/normalize";
import {
  createVariantAttributePocket,
  type CreateVariantAttributePayload,
} from "@/features/product/pocketbase/variant/attribute/create";
import {
  createVariantPocket,
  type CreateVariantPayload,
} from "@/features/product/pocketbase/variant/create";

async function createVariantHandler(
  variants: VariantNormalizeType[],
  optionIdMap: Record<string, string>,
  attributeIdMap: Record<string, string>,
  attributeOptionIdMap: Record<string, string>,
  productId: string
) {
  for (const variant of variants) {
    const payload: CreateVariantPayload = {
      price: variant.price,
      discount: variant.discount,
      stock: variant.stock,
      sku: variant.sku,
      product: productId,
    };
    const res = await createVariantPocket(payload);
    const variantIdDB = res.id;
    const fileId = variant.image?.[0]?.id;

    if (fileId) {
      createVariantFilePocket(variantIdDB, fileId);
    }

    for (const optId of variant.optionIds) {
      const payload: CreateVariantAttributePayload = {
        variant: variantIdDB,
        attribute_value: optionIdMap[optId],
        attribute: attributeIdMap[attributeOptionIdMap[optId]],
      };
      createVariantAttributePocket(payload);
    }
  }
}

export { createVariantHandler };
