import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";
import type { StorePageType } from "@/types/store";

async function getOneStorePagePocket(id: string) {
	return pocketClient
		.collection<StorePageType>(STORE_PAGE_COLLECTION)
		.getOne(id);
}

export { getOneStorePagePocket };
