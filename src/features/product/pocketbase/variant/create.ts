import pocketClient from "@/lib/pocketbase";
import { PRODUCT_VARIANT_COLLECTION } from "@/shared/constants/pocketbase";

export type CreateVariantPayload = {
  price: number;
  discount: number;
  stock: number;
  sku: string;
  product: string;
};

async function createVariantPocket(payload: CreateVariantPayload) {
  const res = await pocketClient
    .collection(PRODUCT_VARIANT_COLLECTION)
    .create(payload);
  return res;
}

export { createVariantPocket };
