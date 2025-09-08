import type { ProductVariantDataType } from "@/features/product/components/product-form/schema";
import {
  createAttributePocket,
  type CreateAttributePayload,
} from "@/features/product/pocketbase/attribute/create";
import {
  createOptionPocket,
  type CreateOptionPayload,
} from "@/features/product/pocketbase/option/create";
import {
  createVariantAttributePocket,
  type CreateVariantAttributePayload,
} from "@/features/product/pocketbase/variant/create-attribute";
import { createVariantImagePocket } from "@/features/product/pocketbase/variant/create-image";
import {
  createVariantPocket,
  type CreateVariantPayload,
} from "@/features/product/pocketbase/variant/create";
import { normalizeVariantProductFormData } from "./normalize";

async function createVariantHandler(
  data: ProductVariantDataType,
  productId: string
) {
  const { attributes, options, variants } =
    normalizeVariantProductFormData(data);

  const attributeIdMap: Record<string, string> = {};
  const optionIdMap: Record<string, string> = {};
  const variantIdMap: Record<string, string> = {};
  const attributeOptionIdMap: Record<string, string> = {};

  for (const attr of attributes) {
    const payload: CreateAttributePayload = {
      name: attr.name,
      product: productId,
    };
    const res = await createAttributePocket(payload);
    attributeIdMap[attr.id] = res.id;
  }

  for (const opt of options) {
    const payload: CreateOptionPayload = {
      name: opt.name,
      attribute: attributeIdMap[opt.attributeId],
    };
    const res = await createOptionPocket(payload);
    optionIdMap[opt.id] = res.id;
    attributeOptionIdMap[opt.id] = opt.attributeId;
  }

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
    variantIdMap[variant.id] = variantIdDB;
    const fileId = variant.image?.[0]?.id;

    if (fileId) {
      createVariantImagePocket({
        variant: variantIdDB,
        file: fileId,
        entity_type: "variant",
      });
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
