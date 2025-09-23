import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";

export type UpdateProductFilePayload = {
	id: string;
	order: number;
};

async function updateProductFilePocket(payload: UpdateProductFilePayload[]) {
	const batch = pocketClient.createBatch();
	for (const item of payload) {
		const { id, order } = item;
		batch.collection(FILE_GRAPH_COLLECTION).update(id, {
			order,
		});
	}
	if (payload.length) {
		return batch.send();
	}
	return;
}

export { updateProductFilePocket };
