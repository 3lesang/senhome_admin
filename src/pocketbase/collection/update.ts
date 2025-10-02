import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

export type UpdateCollectionPayload = {
	title: string;
	slug: string;
	content: string;
};

async function updateCollectionPocket(
	id: string,
	payload: UpdateCollectionPayload,
) {
	return pocketClient.collection(COLLECTION_COLLECTION).update(id, payload);
}

export { updateCollectionPocket };
