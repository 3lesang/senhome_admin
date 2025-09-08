import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

export type CreateVariantImagePayload = {
  variant: string;
  file: string;
  entity_type: "variant";
};

async function createVariantImagePocket(payload: CreateVariantImagePayload) {
  const res = await pocketClient
    .collection(FILE_GRAPH_COLLECTION)
    .create(payload);
  return res;
}

export { createVariantImagePocket };
