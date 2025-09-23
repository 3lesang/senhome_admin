import pocketClient from "@/pocketbase/client";
import { POLICY_COLLECTION } from "@/pocketbase/constants";

async function deletePolicyPocket(ids: string[]) {
	const batch = pocketClient.createBatch();
	for (const id of ids) {
		batch.collection(POLICY_COLLECTION).delete(id);
	}
	if (ids.length) {
		return batch.send();
	}
	return;
}

export { deletePolicyPocket };
