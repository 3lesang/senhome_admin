import pocketClient from "@/pocketbase/client";
import { MENU_COLLECTION } from "@/pocketbase/constants";

export async function deleteMenusHandler(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(MENU_COLLECTION).delete(id);
	}
	return batch.send();
}
