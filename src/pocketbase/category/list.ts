import type { ListResult } from "pocketbase";
import type { CategoryDataType } from "@/types/category";
import pocketClient from "../client";
import { CATEGORY_COLLECTION } from "../constants";
import type { GetListQueryPocketType } from "../types";

async function getFullListCategoryPocket() {
	const res = await pocketClient
		.collection(CATEGORY_COLLECTION)
		.getFullList({});
	return res;
}

async function getListCategoryPocket(
	queries: GetListQueryPocketType,
): Promise<ListResult<CategoryDataType>> {
	const { page, limit, filter } = queries;
	return pocketClient.collection(CATEGORY_COLLECTION).getList(page, limit, {
		sort: "-created",
		expand: "thumbnail",
		filter,
	});
}

export { getFullListCategoryPocket, getListCategoryPocket };
