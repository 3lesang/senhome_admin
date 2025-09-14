import {
  updateAttributePocket,
  type UpdateAttributePayload,
} from "@/pocketbase/product/attribute/update";

async function updateAttributeHandler(payload: UpdateAttributePayload[]) {
  return updateAttributePocket(payload);
}

export { updateAttributeHandler };
