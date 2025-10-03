import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

export type UpdateCollectionPayload = {
	name: string;
	slug: string;
	description: string;
	seo: { title: string; description: string };
};

async function updateCollectionPocket(
	id: string,
	payload: UpdateCollectionPayload,
) {
	return pocketClient.collection(COLLECTION_COLLECTION).update(id, payload);
}

export { updateCollectionPocket };
