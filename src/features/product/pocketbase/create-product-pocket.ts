import pocketClient from "@/lib/pocketbase";
import { PRODUCT_COLLECTION } from "@/shared/constants/pocketbase";

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
  const resp = await pocketClient
    .collection(PRODUCT_COLLECTION)
    .create(payload);
  return resp;
}

export { createProductPocket };
