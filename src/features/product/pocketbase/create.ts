import { pb, PRODUCT_COLLECTION } from "@/lib/pocketbase";

export type CreateProductPayload = {
  name?: string;
  price?: number;
  discount?: number;
  slug?: string;
  content?: string;
  category?: string;
  thumbnail?: string;
  deleted?: Date | null;
};

async function createProductPocket(payload: CreateProductPayload) {
  const resp = await pb.collection(PRODUCT_COLLECTION).create(payload);
  return resp;
}

export { createProductPocket };
