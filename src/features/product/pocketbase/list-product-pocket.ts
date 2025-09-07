import pocketClient from "@/lib/pocketbase";
import { PRODUCT_COLLECTION } from "@/shared/constants/pocketbase";
import type { ProductDataType } from "@/shared/types";
import type { ListResult } from "pocketbase";

export type GetListQueryPocketType = {
  page: number;
  limit: number;
  filter: string;
};

async function getListProductPocket(
  queries: GetListQueryPocketType
): Promise<ListResult<ProductDataType>> {
  const { page, limit, filter } = queries;
  return pocketClient.collection(PRODUCT_COLLECTION).getList(page, limit, {
    sort: "-created",
    expand: "thumbnail",
    filter,
  });
}

export { getListProductPocket };
