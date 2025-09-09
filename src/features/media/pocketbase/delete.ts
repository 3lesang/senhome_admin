import pocketClient from "@/lib/pocketbase";
import { FILE_COLLECTION } from "@/shared/constants/pocketbase";

async function deleteFilePocket(ids: string[]) {
  const batch = pocketClient.createBatch();
  for (const id of ids) {
    batch.collection(FILE_COLLECTION).delete(id);
  }
  if (ids.length) {
    return batch.send();
  }
  return;
}

export { deleteFilePocket };
