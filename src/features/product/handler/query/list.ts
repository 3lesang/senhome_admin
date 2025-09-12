import { getListProductPocket } from "@/pocketbase/product/list";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
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
