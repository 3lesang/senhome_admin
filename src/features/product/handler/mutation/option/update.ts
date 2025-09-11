import {
  updateOptionPocket,
  type UpdateOptionPayload,
} from "@/pocketbase/product/option/update";

async function updateOptionHandler(payload: UpdateOptionPayload[]) {
  return updateOptionPocket(payload);
}

export { updateOptionHandler };
