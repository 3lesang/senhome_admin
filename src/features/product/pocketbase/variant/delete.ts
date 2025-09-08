import pocketClient from "@/lib/pocketbase";
import { PRODUCT_VARIANT_COLLECTION } from "@/shared/constants/pocketbase";

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
