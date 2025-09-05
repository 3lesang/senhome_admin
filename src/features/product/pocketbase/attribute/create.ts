import { pb, PRODUCT_ATTRIBUTE_COLLECTION } from "@/lib/pocketbase";

export type CreateAttributePayload = {
  name: string;
};

async function createAttributePocket(payload: CreateAttributePayload) {
  const res = await pb.collection(PRODUCT_ATTRIBUTE_COLLECTION).create(payload);
  return res;
}

export { createAttributePocket };
