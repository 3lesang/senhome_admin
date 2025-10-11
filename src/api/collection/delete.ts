import { COLLECTION_COLLECTION, pocketClient } from "@/pocketbase";

export async function deleteCollectionsHandler(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(COLLECTION_COLLECTION).delete(id);
	}
	return batch.send();
}
