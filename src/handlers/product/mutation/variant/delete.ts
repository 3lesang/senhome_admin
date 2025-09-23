import { deleteVariantPocket } from "@/pocketbase/product/variant/delete";

async function deleteVariantHandler(ids: string[]) {
  return deleteVariantPocket(ids);
}

export { deleteVariantHandler };
