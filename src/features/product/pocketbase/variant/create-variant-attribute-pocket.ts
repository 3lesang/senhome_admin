import pocketClient from "@/lib/pocketbase";
import { PRODUCT_VARIANT_ATTRIBUTES_COLLECTION } from "@/shared/constants/pocketbase";

export type CreateVariantAttributePayload = {
  variant: string;
  attribute: string;
  attribute_value: string;
};

async function createVariantAttributePocket(
  payload: CreateVariantAttributePayload
) {
  const res = await await pocketClient
    .collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION)
    .create(payload);
  return res;
}

export { createVariantAttributePocket };
