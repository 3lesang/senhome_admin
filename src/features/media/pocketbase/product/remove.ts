import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function removeProductFilePocket(productId: string, fileIds: string[]) {
  const batch = pocketClient.createBatch();
  for (const fileId of fileIds) {
    const res = await pocketClient
      .collection(FILE_GRAPH_COLLECTION)
      .getFirstListItem(`product="${productId}"&&file="${fileId}"`);
    batch.collection(FILE_GRAPH_COLLECTION).delete(res.id);
  }
  if (fileIds.length) {
    return batch;
  }
  return;
}

export { removeProductFilePocket };
