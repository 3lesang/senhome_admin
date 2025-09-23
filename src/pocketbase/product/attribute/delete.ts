import pocketClient from "@/pocketbase/client";
import { PRODUCT_ATTRIBUTE_COLLECTION } from "@/pocketbase/constants";

async function deleteAttributePocket(ids: string[]) {
  const batch = pocketClient.createBatch();
  for (const id of ids) {
    batch.collection(PRODUCT_ATTRIBUTE_COLLECTION).delete(id);
  }
  if (ids.length) {
    return batch.send();
  }
  return;
}

export { deleteAttributePocket };
