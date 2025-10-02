import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";

async function deleteStorePagePocket(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(STORE_PAGE_COLLECTION).delete(id);
	}
	if (ids.length) {
		return batch.send();
	}
	return;
}

export { deleteStorePagePocket };
