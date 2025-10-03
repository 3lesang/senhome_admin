import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import type { GetListQueryPocketType } from "@/pocketbase/types";
import type { ProductDataType } from "@/types/product";

async function getListProductPocket(queries: GetListQueryPocketType) {
	const { page, limit, filter } = queries;
	return pocketClient
		.collection<ProductDataType>(PRODUCT_COLLECTION)
		.getList(page, limit, {
			sort: "-created",
			expand: "thumbnail",
			filter,
		});
}

async function getFullListProductPocket(query: string) {
	return pocketClient
		.collection<ProductDataType>(PRODUCT_COLLECTION)
		.getFullList({
			sort: "-created",
			expand: "thumbnail",
			filter: query,
		});
}

export { getFullListProductPocket, getListProductPocket };
