import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

export type UpdateVariantFilePayload = {
  id: string;
  fileId: string;
};
async function updateVariantFilePocket(payload: UpdateVariantFilePayload[]) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    const { id, fileId } = item;
    const body = { file: fileId };
    batch.collection(FILE_GRAPH_COLLECTION).update(id, body);
  }
  if (payload.length) {
    return batch.send();
  }
  return;
}

export { updateVariantFilePocket };
