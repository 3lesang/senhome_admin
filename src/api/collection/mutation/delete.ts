import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

export async function deleteCollectionsHandler(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(COLLECTION_COLLECTION).delete(id);
	}
	return batch.send();
}
