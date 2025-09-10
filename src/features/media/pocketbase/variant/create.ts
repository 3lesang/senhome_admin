import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

export type CreateVariantFilePayload = {
  variantId: string;
  fileId: string;
};

async function createVariantFilePocket(payload: CreateVariantFilePayload[]) {
  const batch = pocketClient.createBatch();
  for (const item of payload) {
    const body = {
      entity_type: "variant",
      variant: item.variantId,
      file: item.fileId,
    };
    batch.collection(FILE_GRAPH_COLLECTION).create(body);
  }

  if (payload.length) {
    return batch.send();
  }

  return;
}

export { createVariantFilePocket };
