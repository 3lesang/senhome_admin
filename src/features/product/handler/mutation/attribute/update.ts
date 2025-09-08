import {
  updateAttributePocket,
  type UpdateAttributePayload,
} from "@/features/product/pocketbase/attribute/update";

async function updateAttributeHandler(payload: UpdateAttributePayload[]) {
  return updateAttributePocket(payload);
}

export { updateAttributeHandler };
