import { MENU_COLLECTION, pocketClient } from "@/pocketbase";

export async function deleteMenusHandler(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(MENU_COLLECTION).delete(id);
	}
	return batch.send();
}
