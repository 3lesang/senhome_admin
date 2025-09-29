import { queryOptions } from "@tanstack/react-query";
import { MENU_COLLECTION } from "@/pocketbase/constants";
import { getListMenuPocket } from "@/pocketbase/menu/list";

type GetListQueryOptionType = {
	page: number;
	limit: number;
	query: string;
};

export const getListMenuQueryOptions = (queries: GetListQueryOptionType) => {
	const { page, limit, query } = queries;
	return queryOptions({
		queryKey: [MENU_COLLECTION, page, limit, query],
		queryFn: () => getListMenuPocket({ page, limit, filter: query }),
	});
};
