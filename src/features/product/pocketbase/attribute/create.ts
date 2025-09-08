import pocketClient from "@/lib/pocketbase";
import { PRODUCT_ATTRIBUTE_COLLECTION } from "@/shared/constants/pocketbase";

export type CreateAttributePayload = {
  name: string;
  product: string;
};

async function createAttributePocket(payload: CreateAttributePayload) {
  const res = await pocketClient
    .collection(PRODUCT_ATTRIBUTE_COLLECTION)
    .create(payload);
  return res;
}

export { createAttributePocket };
