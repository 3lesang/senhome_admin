import { queryOptions } from "@tanstack/react-query";
import { STORE_PAGE_QUERY_KEY } from "@/constants";
import { pocketClient, STORE_PAGE_COLLECTION } from "@/pocketbase";

export const getStorePagesQueryOptions = ({
	page,
	limit,
	query,
}: {
	page: number;
	limit: number;
	query: string;
}) => {
	return queryOptions({
		queryKey: [STORE_PAGE_QUERY_KEY, page, limit, query],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					title: string;
					created: Date;
				}>(STORE_PAGE_COLLECTION)
				.getList(page, limit, { filter: query });
		},
	});
};
