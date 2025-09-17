import pocketClient from "../client";
import { CATEGORY_COLLECTION } from "../constants";

async function deleteCategoryPocket(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(CATEGORY_COLLECTION).delete(id);
	}
	if (ids.length) {
		return batch.send();
	}
	return;
}

export { deleteCategoryPocket };
