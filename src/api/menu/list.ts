import { queryOptions } from "@tanstack/react-query";
import { MENU_QUERY_KEY } from "@/constants";
import { MENU_COLLECTION, pocketClient } from "@/pocketbase";

export const getListMenuQueryOptions = ({
	page,
	limit,
	query,
}: {
	page: number;
	limit: number;
	query: string;
}) => {
	return queryOptions({
		queryKey: [MENU_QUERY_KEY, page, limit, query],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					name: string;
					position: "header" | "footer";
				}>(MENU_COLLECTION)
				.getList(page, limit, { filter: query });
		},
	});
};
