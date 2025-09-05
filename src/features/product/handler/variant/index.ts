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
} from "@/features/product/pocketbase/variant/attribute";
import {
  createVariantPocket,
  type CreateVariantPayload,
} from "@/features/product/pocketbase/variant/create";
import type { ProductVariantDataType } from "@/features/product/components/product-form/schema";
import { normalizeFormData } from "./normalize";

async function createVariantHandler(
  data: ProductVariantDataType,
  productId: string
) {
  const { attributes, options, variants } = normalizeFormData(data);

  const attributeIdMap: Record<string, string> = {};
  const optionIdMap: Record<string, string> = {};
  const variantIdMap: Record<string, string> = {};

  for (const attr of attributes) {
    const payload: CreateAttributePayload = {
      name: attr.name,
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
    variantIdMap[variant.id] = res.id;

    for (const optId of variant.optionIds) {
      const payload: CreateVariantAttributePayload = {
        variant: res.id,
        attribute_value: optionIdMap[optId],
        attribute: attributeIdMap[optId],
      };
      createVariantAttributePocket(payload);
    }
  }
}

export { createVariantHandler };
