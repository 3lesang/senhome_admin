import type { UpdateProductDataType } from "@/features/product/types";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants/pocketbase";

export type UpdateProductPayload = Partial<UpdateProductDataType>;

async function updateProductPocket(
  productId: string,
  payload: UpdateProductPayload
) {
  return pocketClient.collection(PRODUCT_COLLECTION).update(productId, payload);
}

export { updateProductPocket };
