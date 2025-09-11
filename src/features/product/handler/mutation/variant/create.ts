import type { VariantNormalizeType } from "@/features/product/handler/mutation/normalize";
import {
  createVariantPocket,
  type CreateVariantPayload,
} from "@/pocketbase/product/variant/create";

async function createVariantHandler(
  variants: VariantNormalizeType[],
  productId: string
) {
  const variantIdMap: Record<string, string> = {};

  for (const variant of variants) {
    const payload: CreateVariantPayload = {
      price: variant.price,
      discount: variant.discount,
      stock: variant.stock,
      sku: variant.sku,
      product: productId,
    };
    const res = await createVariantPocket(payload);
    variantIdMap[variant.id] = res.id;
  }

  return variantIdMap;
}

export { createVariantHandler };
