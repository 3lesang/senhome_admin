import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function deleteProductFilePocket(ids: string[]) {
  const batch = pocketClient.createBatch();
  for (const id of ids) {
    batch.collection(FILE_GRAPH_COLLECTION).delete(id);
  }
  if (ids.length) {
    return batch.send();
  }
  return;
}

export { deleteProductFilePocket };
