import pocketClient from "@/pocketbase/client";
import { PRODUCT_ATTRIBUTE_VALUE_COLLECTION } from "@/pocketbase/constants/pocketbase";

export type UpdateOptionPayload = {
  id: string;
  name: string;
};

async function updateOptionPocket(payload: UpdateOptionPayload[]) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    const { id, name } = item;
    batch.collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION).update(id, { name });
  }
  if (payload.length) {
    return batch.send();
  }
  return;
}

export { updateOptionPocket };
