import pocketClient from "@/lib/pocketbase";
import { PRODUCT_ATTRIBUTE_VALUE_COLLECTION } from "@/shared/constants/pocketbase";

export type CreateOptionPayload = {
  name: string;
  attribute: string;
};

async function createOptionPocket(payload: CreateOptionPayload) {
  const res = await pocketClient
    .collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION)
    .create(payload);
  return res;
}

export { createOptionPocket };
