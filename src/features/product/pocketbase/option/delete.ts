import pocketClient from "@/lib/pocketbase";
import { PRODUCT_ATTRIBUTE_VALUE_COLLECTION } from "@/shared/constants/pocketbase";

async function deleteOptionPocket(ids: string[]) {
  const batch = pocketClient.createBatch();
  for (const id of ids) {
    batch.collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION).delete(id);
  }
  if (ids.length) {
    return batch.send();
  }
  return;
}

export { deleteOptionPocket };
