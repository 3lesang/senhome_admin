import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

async function deleteCollectionsPocket(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(COLLECTION_COLLECTION).delete(id);
	}
	if (ids.length) {
		return batch.send();
	}
	return;
}

export { deleteCollectionsPocket };
