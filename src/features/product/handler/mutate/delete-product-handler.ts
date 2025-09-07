import { deleteProductPocket } from "@/features/product/pocketbase/delete-product-pocket";

async function deleteProductHandler(ids: string[]) {
  return deleteProductPocket(ids).send();
}

export { deleteProductHandler };
