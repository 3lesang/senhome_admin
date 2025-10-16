import { FILE_COLLECTION, pocketClient } from "@/pocketbase";

export async function deleteFilesHandler(ids: string[]) {
	if (ids.length) {
		const batch = pocketClient.createBatch();
		for (const id of ids) {
			batch.collection(FILE_COLLECTION).delete(id);
		}
		return batch.send();
	}
}
