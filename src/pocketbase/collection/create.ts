import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

export type CreateCollectionPayload = {
	title: string;
	slug: string;
	content: string;
};

async function createCollectionPocket(payload: CreateCollectionPayload) {
	return pocketClient.collection(COLLECTION_COLLECTION).create(payload);
}

export { createCollectionPocket };
