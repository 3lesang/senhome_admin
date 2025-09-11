import pocketClient from "@/pocketbase/client";
import { PRODUCT_VARIANT_COLLECTION } from "@/pocketbase/constants/pocketbase";

async function deleteVariantPocket(ids: string[]) {
  const batch = pocketClient.createBatch();
  for (const id of ids) {
    batch.collection(PRODUCT_VARIANT_COLLECTION).delete(id);
  }
  if (ids.length) {
    return batch.send();
  }
  return;
}

export { deleteVariantPocket };
