import type { ListResult } from "pocketbase";
import pocketClient from "@/pocketbase/client";
import { ORDER_COLLECTION } from "@/pocketbase/constants";
import type { GetListQueryPocketType } from "@/pocketbase/types";
import type { OrderDataType } from "@/types/order";

async function getListOrderPocket(
	queries: GetListQueryPocketType,
): Promise<ListResult<OrderDataType>> {
	const { page, limit, filter } = queries;
	return pocketClient.collection(ORDER_COLLECTION).getList(page, limit, {
		sort: "-created",
		filter,
	});
}

export { getListOrderPocket };
