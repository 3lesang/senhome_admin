import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function getListVariantProductFilePocket(productId: string) {
  const res = await pocketClient.collection(FILE_GRAPH_COLLECTION).getFullList({
    filter: `variant.product="${productId}"`,
    expand: "file",
  });
  return res;
}

export { getListVariantProductFilePocket };
