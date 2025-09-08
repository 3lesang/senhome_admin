import {
  updateVariantPocket,
  type UpdateVariantPayload,
} from "@/features/product/pocketbase/variant/update";

async function updateVariantHandler(payload: UpdateVariantPayload[]) {
  return updateVariantPocket(payload);
}

export { updateVariantHandler };
