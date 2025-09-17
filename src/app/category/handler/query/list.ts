import { queryOptions } from "@tanstack/react-query";
import {
	getFullListCategoryPocket,
	getListCategoryPocket,
} from "@/pocketbase/category/list";
import { CATEGORY_COLLECTION } from "@/pocketbase/constants";

function getFullListCategoryQueryOptions() {
	return queryOptions({
		queryKey: [CATEGORY_COLLECTION],
		queryFn: getFullListCategoryPocket,
	});
}

type GetListQueryOptionType = {
	page?: number;
	limit?: number;
	query?: string;
};

function getListCategoryQueryOptions(queries: GetListQueryOptionType) {
	const { page = 1, limit = 10, query = "" } = queries;
	return queryOptions({
		queryKey: [CATEGORY_COLLECTION, page, limit],
		queryFn: () => getListCategoryPocket({ page, limit, filter: query }),
	});
}

export { getFullListCategoryQueryOptions, getListCategoryQueryOptions };
