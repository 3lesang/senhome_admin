import type { OrderDataType } from "@/features/order/types";
import pocketClient from "@/pocketbase/client";
import { ORDER_COLLECTION } from "@/pocketbase/constants";
import type { GetListQueryPocketType } from "@/pocketbase/types";
import type { ListResult } from "pocketbase";

async function getListOrderPocket(
  queries: GetListQueryPocketType
): Promise<ListResult<OrderDataType>> {
  const { page, limit, filter } = queries;
  return pocketClient.collection(ORDER_COLLECTION).getList(page, limit, {
    sort: "-created",
    filter,
  });
}

export { getListOrderPocket };
