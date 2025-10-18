import { PRODUCT_REVIEW_COLLECTION, pocketClient } from "@/pocketbase";

export async function deleteReviewsHandler(ids: string[]) {
	if (ids.length) {
		const batch = pocketClient.createBatch();
		for (const id of ids) {
			batch.collection(PRODUCT_REVIEW_COLLECTION).delete(id);
		}
		return batch.send();
	}
}
