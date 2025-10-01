import pocketClient from "../client";
import { MENU_COLLECTION } from "../constants";

async function deleteMenusPocket(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(MENU_COLLECTION).delete(id);
	}
	if (ids.length) {
		return batch.send();
	}
	return;
}

export { deleteMenusPocket };
