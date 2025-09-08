import { deleteVariantPocket } from "@/features/product/pocketbase/variant/delete";

async function deleteVariantHandler(ids: string[]) {
  return deleteVariantPocket(ids);
}

export { deleteVariantHandler };
