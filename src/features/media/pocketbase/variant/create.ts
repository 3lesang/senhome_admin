import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function createVariantFilePocket(variantId: string, fileId: string) {
  const res = await pocketClient.collection(FILE_GRAPH_COLLECTION).create({
    entity_type: "variant",
    variant: variantId,
    file: fileId,
  });

  return res;
}

export { createVariantFilePocket };
