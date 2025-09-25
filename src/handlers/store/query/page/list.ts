import { queryOptions } from "@tanstack/react-query";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";
import { getListStorePagePocket } from "@/pocketbase/store/page/list";

type GetListQueryOptionType = {
	page: number;
	limit: number;
	query: string;
};

export const getListStorePageQueryOptions = (
	queries: GetListQueryOptionType,
) => {
	const { page, limit, query } = queries;
	return queryOptions({
		queryKey: [STORE_PAGE_COLLECTION, page, limit, query],
		queryFn: () =>
			getListStorePagePocket({
				page,
				limit,
				filter: query,
			}),
	});
};
