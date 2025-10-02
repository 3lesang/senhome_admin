import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";
import type { CollectionType } from "@/types/collection";

export type GetListQueryPocketType = {
	page: number;
	limit: number;
	filter: string;
};

async function getListCollectionPocket(query: GetListQueryPocketType) {
	return pocketClient
		.collection<CollectionType>(COLLECTION_COLLECTION)
		.getList(query.page, query.limit, { filter: query.filter });
}

export { getListCollectionPocket };
