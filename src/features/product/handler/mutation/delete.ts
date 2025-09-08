import { deleteProductPocket } from "@/features/product/pocketbase/delete";

async function deleteProductHandler(ids: string[]) {
  return deleteProductPocket(ids).send();
}

export { deleteProductHandler };
