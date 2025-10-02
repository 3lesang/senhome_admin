import { queryOptions } from "@tanstack/react-query";
import { getListCollectionPocket } from "@/pocketbase/collection/list";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

type GetListQueryOptionType = {
	page: number;
	limit: number;
	query: string;
};

export const getListCollectionQueryOptions = (
	queries: GetListQueryOptionType,
) => {
	const { page, limit, query } = queries;
	return queryOptions({
		queryKey: [COLLECTION_COLLECTION, page, limit, query],
		queryFn: () =>
			getListCollectionPocket({
				page,
				limit,
				filter: query,
			}),
	});
};
