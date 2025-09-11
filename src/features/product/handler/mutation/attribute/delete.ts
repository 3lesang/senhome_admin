import { deleteAttributePocket } from "@/pocketbase/product/attribute/delete";

async function deleteAttributeHandler(ids: string[]) {
  return deleteAttributePocket(ids);
}

export { deleteAttributeHandler };
