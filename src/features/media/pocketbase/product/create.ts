import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

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
