import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";

export type CreateStorePagePayload = {
	title: string;
	slug: string;
	content: string;
};

async function createStorePagePocket(payload: CreateStorePagePayload) {
	return pocketClient.collection(STORE_PAGE_COLLECTION).create(payload);
}

export { createStorePagePocket };
