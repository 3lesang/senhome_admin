import { pb, PRODUCT_VARIANT_COLLECTION } from "@/lib/pocketbase";

export type CreateVariantPayload = {
  price: number;
  discount: number;
  stock: number;
  sku: string;
  product: string;
};

async function createVariantPocket(payload: CreateVariantPayload) {
  const res = await pb.collection(PRODUCT_VARIANT_COLLECTION).create(payload);
  return res;
}

export { createVariantPocket };
