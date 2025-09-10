import { getListVariantProductFilePocket } from "@/features/media/pocketbase/variant/list";
import {
  updateVariantFilePocket,
  type UpdateVariantFilePayload,
} from "@/features/media/pocketbase/variant/update";
import type { VariantNormalizeType } from "@/features/product/handler/mutation/normalize";

async function updateVariantFileProductHandler(
  productId: string,
  payload: VariantNormalizeType[]
) {
  const variantFileMap: Record<string, string> = {};
  payload.forEach((i) => {
    variantFileMap[i.id] = i.image?.[0]?.id ?? "";
  });

  const res = await getListVariantProductFilePocket(productId);
  const formatPayload: UpdateVariantFilePayload[] = res.map((i) => {
    const variantId = i.variant;
    const body: UpdateVariantFilePayload = {
      id: i.id,
      fileId: variantFileMap[variantId],
    };
    return body;
  });

  return updateVariantFilePocket(formatPayload);
}

export { updateVariantFileProductHandler };
