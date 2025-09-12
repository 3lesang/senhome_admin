import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";

async function deleteVariantFilePocket(ids: string[]) {
  const batch = pocketClient.createBatch();
  for (const id of ids) {
    batch.collection(FILE_GRAPH_COLLECTION).delete(id);
  }

  if (ids.length) {
    return batch.send();
  }

  return;
}

export { deleteVariantFilePocket };
