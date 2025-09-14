import {
  updateVariantPocket,
  type UpdateVariantPayload,
} from "@/pocketbase/product/variant/update";

async function updateVariantHandler(payload: UpdateVariantPayload[]) {
  return updateVariantPocket(payload);
}

export { updateVariantHandler };
