import type { FileType } from "@/components/media/schema";
import { FILE_GRAPH_COLLECTION, pb } from "@/lib/pocketbase";
import _ from "lodash";

async function batchMedia(
  oldMedia: FileType[],
  newMedia: FileType[],
  productId: string
) {
  const removed = _.differenceBy(oldMedia, newMedia, "id");
  const added = _.differenceBy(newMedia, oldMedia, "id");
  const batch = pb.createBatch();

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
}

export { batchMedia };
