import { FILE_COLLECTION, pocketClient } from "@/pocketbase";

export async function createFileHandler(files: FileList) {
	const filesArr = Array.from(files);
	if (filesArr.length) {
		const batch = pocketClient.createBatch();
		for (const file of filesArr) {
			batch.collection(FILE_COLLECTION).create({ file });
		}
		return batch.send();
	}
}
