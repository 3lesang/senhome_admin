import pocketClient from "@/pocketbase/client";
import { PRODUCT_ATTRIBUTE_COLLECTION } from "@/pocketbase/constants/pocketbase";

type AttributePayloadType = {
  id: string;
  name: string;
};

type BatchAttributePayload = {
  productId: string;
  added: AttributePayloadType[];
  updated: AttributePayloadType[];
  deleted: AttributePayloadType[];
};

async function batchAttributePocket(payload: BatchAttributePayload) {
  const batch = pocketClient.createBatch();
  const { productId, added, updated, deleted } = payload;
  for (const attr of added) {
    batch
      .collection(PRODUCT_ATTRIBUTE_COLLECTION)
      .create({ product: productId, name: attr.name });
  }
  for (const attr of updated) {
    batch
      .collection(PRODUCT_ATTRIBUTE_COLLECTION)
      .update(attr.id, { name: attr.name });
  }
  for (const attr of deleted) {
    batch.collection(PRODUCT_ATTRIBUTE_COLLECTION).delete(attr.id);
  }
  return batch;
}

export { batchAttributePocket };
