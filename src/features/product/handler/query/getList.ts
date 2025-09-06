import pocketClient from "@/lib/pocketbase";
import { PRODUCT_COLLECTION } from "@/shared/constants/pocketbase";
import type { ProductDataType } from "@/shared/types";
import { queryOptions } from "@tanstack/react-query";
import type { ListResult } from "pocketbase";

export const productQueryOptions = (
  page: number,
  limit: number,
  filter?: string
) =>
  queryOptions<ListResult<ProductDataType>>({
    queryKey: [PRODUCT_COLLECTION, page, limit, filter],
    queryFn: () =>
      pocketClient.collection(PRODUCT_COLLECTION).getList(page, limit, {
        sort: "-created",
        expand: "thumbnail",
        filter,
      }),
  });
