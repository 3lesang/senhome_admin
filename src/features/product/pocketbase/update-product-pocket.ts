import pocketClient from "@/lib/pocketbase";
import { PRODUCT_COLLECTION } from "@/shared/constants/pocketbase";
import type { UpdateProductDataType } from "@/shared/types";

export type UpdateProductPayload = Partial<UpdateProductDataType>;

async function updateProductPocket(
  productId: string,
  payload: UpdateProductPayload
) {
  return pocketClient.collection(PRODUCT_COLLECTION).update(productId, payload);
}

export { updateProductPocket };
