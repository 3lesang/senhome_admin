import type { FileType } from "@/features/media/components/schema";
import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function batchMediaHttp(
  added: FileType[],
  removed: FileType[],
  productId: string
) {
  const batch = pocketClient.createBatch();
  for (const item of removed) {
    if (item.record) {
      batch.collection(FILE_GRAPH_COLLECTION).delete(item.record);
    }
  }
  for (const item of added) {
    batch.collection(FILE_GRAPH_COLLECTION).create({
      entity_type: "product",
      product: productId,
      file: item.id,
    });
  }
  if (removed.length || added.length) {
    return batch.send();
  }
  return null;
}

export { batchMediaHttp };
