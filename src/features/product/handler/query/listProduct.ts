import { getListProductPocket } from "@/features/product/pocketbase/list-product-pocket";
import { PRODUCT_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

type GetListQueryOptionType = {
  page?: number;
  limit?: number;
  query?: string;
};

export const getListProductQueryOptions = (queries: GetListQueryOptionType) => {
  const { page = 1, limit = 10, query = "" } = queries;
  return queryOptions({
    queryKey: [PRODUCT_COLLECTION, page, limit, query],
    queryFn: () => getListProductPocket({ page, limit, filter: query }),
  });
};
