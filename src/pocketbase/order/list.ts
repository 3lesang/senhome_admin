import type { ListResult } from "pocketbase";
import type { OrderDataType } from "@/app/order/types";
import pocketClient from "@/pocketbase/client";
import { ORDER_COLLECTION } from "@/pocketbase/constants";
import type { GetListQueryPocketType } from "@/pocketbase/types";

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
