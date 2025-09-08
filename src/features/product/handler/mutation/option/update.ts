import {
  updateOptionPocket,
  type UpdateOptionPayload,
} from "@/features/product/pocketbase/option/update";

async function updateOptionHandler(payload: UpdateOptionPayload[]) {
  return updateOptionPocket(payload);
}

export { updateOptionHandler };
