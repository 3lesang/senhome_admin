import pocketClient from "@/lib/pocketbase";
import { PRODUCT_VARIANT_ATTRIBUTES_COLLECTION } from "@/shared/constants/pocketbase";

export type CreateVariantAttributePayload = {
  variant: string;
  attribute: string;
  attribute_value: string;
};

async function createVariantAttributePocket(
  payload: CreateVariantAttributePayload[]
) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    batch.collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION).create(item);
  }
  if (payload.length) {
    return batch.send();
  }
  return;
}

export { createVariantAttributePocket };
