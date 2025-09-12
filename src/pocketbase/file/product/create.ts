import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";

export type CreateProductFilePayload = {
  productId: string;
  filedId: string;
};

async function createProductFilePocket(payload: CreateProductFilePayload[]) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    batch.collection(FILE_GRAPH_COLLECTION).create({
      entity_type: "product",
      product: item.productId,
      file: item.filedId,
    });
  }
  if (payload.length) {
    return batch.send();
  }
  return;
}

export { createProductFilePocket };
