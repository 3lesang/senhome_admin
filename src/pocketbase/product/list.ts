import type { ListResult } from "pocketbase";
import type { ProductDataType } from "@/app/product/types";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import type { GetListQueryPocketType } from "@/pocketbase/types";

async function getListProductPocket(
	queries: GetListQueryPocketType,
): Promise<ListResult<ProductDataType>> {
	const { page, limit, filter } = queries;
	return pocketClient.collection(PRODUCT_COLLECTION).getList(page, limit, {
		sort: "-created",
		expand: "thumbnail",
		filter,
	});
}

export { getListProductPocket };
