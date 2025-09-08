import { deleteAttributePocket } from "@/features/product/pocketbase/attribute/delete";

async function deleteAttributeHandler(ids: string[]) {
  return deleteAttributePocket(ids);
}

export { deleteAttributeHandler };
