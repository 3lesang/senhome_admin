import type { AttributeNormalizeType } from "@/features/product/handler/mutation/normalize";
import {
  createAttributePocket,
  type CreateAttributePayload,
} from "@/pocketbase/product/attribute/create";

async function createAttributeHandler(
  attrs: AttributeNormalizeType[],
  productId: string
) {
  const attributeIdMap: Record<string, string> = {};

  for (const attr of attrs) {
    const payload: CreateAttributePayload = {
      name: attr.name,
      product: productId,
    };
    const res = await createAttributePocket(payload);
    attributeIdMap[attr.id] = res.id;
  }

  return attributeIdMap;
}

export { createAttributeHandler };
