import pocketClient from "@/lib/pocketbase";
import { PRODUCT_ATTRIBUTE_COLLECTION } from "@/shared/constants/pocketbase";

export type UpdateAttributePayload = {
  id: string;
  name: string;
};

async function updateAttributePocket(payload: UpdateAttributePayload[]) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    const { id, name } = item;
    batch.collection(PRODUCT_ATTRIBUTE_COLLECTION).update(id, { name });
  }
  if (payload.length) {
    return batch.send();
  }
  return;
}

export { updateAttributePocket };
