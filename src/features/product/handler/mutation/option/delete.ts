import { deleteOptionPocket } from "@/features/product/pocketbase/option/delete";

async function deleteOptionHandler(ids: string[]) {
  return deleteOptionPocket(ids);
}

export { deleteOptionHandler };
