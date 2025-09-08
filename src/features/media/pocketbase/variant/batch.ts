import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function batchVariantFilePocket(variantId: string, fileIds: string[]) {
  const batch = pocketClient.createBatch();
  for (const id of fileIds) {
    batch.collection(FILE_GRAPH_COLLECTION).create({
      entity_type: "variant",
      variant: variantId,
      file: id,
    });
  }
  return batch;
}

export { batchVariantFilePocket };
