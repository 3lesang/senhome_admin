import pocketClient from "@/lib/pocketbase";
import { PRODUCT_VARIANT_COLLECTION } from "@/shared/constants/pocketbase";

export type UpdateVariantPayload = {
  id: string;
  price: number;
  discount: number;
  stock: number;
  sku: string;
};

async function updateVariantPocket(payload: UpdateVariantPayload[]) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    const { id, ...body } = item;
    batch.collection(PRODUCT_VARIANT_COLLECTION).update(id, body);
  }
  if (payload.length) {
    return batch.send();
  }
  return;
}

export { updateVariantPocket };
