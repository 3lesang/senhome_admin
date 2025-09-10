import type { FileType } from "@/features/media/types";
import pocketClient from "@/lib/pocketbase";
import { PRODUCT_VARIANT_COLLECTION } from "@/shared/constants/pocketbase";

export type UpdateVariantPayload = {
  id: string;
  price: number;
  discount: number;
  stock: number;
  sku: string;
  image?: FileType[];
};

async function updateVariantPocket(payload: UpdateVariantPayload[]) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    const { id, price, discount, stock, sku } = item;
    const body = { price, discount, stock, sku };
    batch.collection(PRODUCT_VARIANT_COLLECTION).update(id, body);
  }
  if (payload.length) {
    return batch.send();
  }
  return;
}

export { updateVariantPocket };
