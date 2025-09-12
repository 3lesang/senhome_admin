import type { ProductDataType } from "@/features/product/types";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import type { GetListQueryPocketType } from "@/pocketbase/types";
import type { ListResult } from "pocketbase";

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
