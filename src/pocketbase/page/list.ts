import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";
import type { StorePageType } from "@/types/store";

export type GetListQueryPocketType = {
	page: number;
	limit: number;
	filter: string;
};

async function getListStorePagePocket(query: GetListQueryPocketType) {
	return pocketClient
		.collection<StorePageType>(STORE_PAGE_COLLECTION)
		.getList(query.page, query.limit, { filter: query.filter });
}

export { getListStorePagePocket };
