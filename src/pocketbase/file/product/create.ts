import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";

export type CreateProductFilePayload = {
	productId: string;
	filedId: string;
	order: number;
};

async function createProductFilePocket(payload: CreateProductFilePayload[]) {
	const batch = pocketClient.createBatch();
	for (const item of payload) {
		batch.collection(FILE_GRAPH_COLLECTION).create({
			entity_type: "product",
			product: item.productId,
			file: item.filedId,
			order: item.order,
		});
	}
	if (payload.length) {
		return batch.send();
	}
	return;
}

export { createProductFilePocket };
