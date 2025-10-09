import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";

async function deleteProductsHandler(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(PRODUCT_COLLECTION).delete(id);
	}
	return batch.send();
}

export { deleteProductsHandler };
