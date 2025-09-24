import { queryOptions } from "@tanstack/react-query";
import { ORDER_COLLECTION } from "@/pocketbase/constants";
import { getListOrderPocket } from "@/pocketbase/order/list";

type GetListQueryOptionType = {
	page: number;
	limit: number;
	query: string;
};

export const getListOrderQueryOptions = (queries: GetListQueryOptionType) => {
	const { page, limit, query } = queries;
	return queryOptions({
		queryKey: [ORDER_COLLECTION, page, limit, query],
		queryFn: () => getListOrderPocket({ page, limit, filter: query }),
	});
};
