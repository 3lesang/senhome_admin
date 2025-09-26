import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";

async function getOneVariantFilePocket(variantId: string) {
	const res = await pocketClient
		.collection(FILE_GRAPH_COLLECTION)
		.getFirstListItem(`variant="${variantId}"`, {
			expand: "file",
		});

	return res;
}

export { getOneVariantFilePocket };
