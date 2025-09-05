import { pb, PRODUCT_COLLECTION } from "@/lib/pocketbase";
import type { UpdateProductDataType } from "@/shared/types";

export type UpdateProductPayload = Partial<UpdateProductDataType>;

async function updateProductPocket(
  productId: string,
  payload: UpdateProductPayload
) {
  return pb.collection(PRODUCT_COLLECTION).update(productId, payload);
}

export { updateProductPocket };
