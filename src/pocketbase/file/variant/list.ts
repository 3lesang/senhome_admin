import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";

async function getListVariantProductFilePocket(productId: string) {
  const res = await pocketClient.collection(FILE_GRAPH_COLLECTION).getFullList({
    filter: `variant.product="${productId}"`,
    expand: "file",
  });
  return res;
}

export { getListVariantProductFilePocket };
