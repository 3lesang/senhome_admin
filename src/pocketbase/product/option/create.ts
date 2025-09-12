import pocketClient from "@/pocketbase/client";
import { PRODUCT_ATTRIBUTE_VALUE_COLLECTION } from "@/pocketbase/constants";

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
