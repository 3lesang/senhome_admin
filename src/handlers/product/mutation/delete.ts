import { deleteProductPocket } from "@/pocketbase/product/delete";

async function deleteProductHandler(ids: string[]) {
  return deleteProductPocket(ids).send();
}

export { deleteProductHandler };
