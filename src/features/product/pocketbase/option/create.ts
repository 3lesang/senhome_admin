import { pb, PRODUCT_ATTRIBUTE_VALUE_COLLECTION } from "@/lib/pocketbase";

export type CreateOptionPayload = {
  name: string;
  attribute: string;
};

async function createOptionPocket(payload: CreateOptionPayload) {
  const res = await pb
    .collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION)
    .create(payload);
  return res;
}

export { createOptionPocket };
