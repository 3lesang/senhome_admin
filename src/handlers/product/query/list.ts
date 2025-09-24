import { queryOptions } from "@tanstack/react-query";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import { getListProductPocket } from "@/pocketbase/product/list";

type GetListQueryOptionType = {
	page: number;
	limit: number;
	query: string;
};

export const getListProductQueryOptions = (queries: GetListQueryOptionType) => {
	const { page, limit, query } = queries;
	return queryOptions({
		queryKey: [PRODUCT_COLLECTION, page, limit, query],
		queryFn: () =>
			getListProductPocket({
				page,
				limit,
				filter: query,
			}),
	});
};
