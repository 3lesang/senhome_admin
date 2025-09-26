import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";

async function getListProductFilePocket(productId: string) {
	const res = await pocketClient
		.collection(FILE_GRAPH_COLLECTION)
		.getFullList({ filter: `product="${productId}"` });
	return res;
}

export { getListProductFilePocket };
