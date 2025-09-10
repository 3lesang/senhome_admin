import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";

async function getOneVariantFilePocket(variantId: string) {
  const res = await pocketClient
    .collection(FILE_GRAPH_COLLECTION)
    .getFirstListItem(`variant="${variantId}"`, {
      expand: "file",
    });

  return res;
}

export { getOneVariantFilePocket };
