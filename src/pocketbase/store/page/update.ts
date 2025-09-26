import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";

export type UpdateStorePagePayload = {
	title: string;
	slug: string;
	content: string;
};

async function updateStorePagePocket(
	id: string,
	payload: UpdateStorePagePayload,
) {
	return pocketClient.collection(STORE_PAGE_COLLECTION).update(id, payload);
}

export { updateStorePagePocket };
