import { pb, PRODUCT_VARIANT_ATTRIBUTES_COLLECTION } from "@/lib/pocketbase";

export type CreateVariantAttributePayload = {
  variant: string;
  attribute: string;
  attribute_value: string;
};

async function createVariantAttributePocket(
  payload: CreateVariantAttributePayload
) {
  const res = await await pb
    .collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION)
    .create(payload);
  return res;
}

export { createVariantAttributePocket };
