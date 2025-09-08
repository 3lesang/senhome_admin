import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function createProductFilePocket(productId: string, fileIds: string[]) {
  const batch = pocketClient.createBatch();
  for (const id of fileIds) {
    batch.collection(FILE_GRAPH_COLLECTION).create({
      entity_type: "product",
      product: productId,
      file: id,
    });
  }
  if (fileIds.length) {
    return batch.send();
  }
  return;
}

export { createProductFilePocket };
