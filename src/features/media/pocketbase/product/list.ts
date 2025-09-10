import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function getListProductFilePocket(productId: string) {
  const res = await pocketClient
    .collection(FILE_GRAPH_COLLECTION)
    .getFullList({ filter: `product="${productId}"` });
  return res;
}

export { getListProductFilePocket };
