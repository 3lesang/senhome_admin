import { queryOptions } from "@tanstack/react-query";
import { MENU_QUERY_KEY } from "@/constants";
import { MENU_COLLECTION, pocketClient } from "@/pocketbase";

export function getOneMenuQueryOptions(id: string) {
	return queryOptions({
		queryKey: [MENU_QUERY_KEY, id],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					name: string;
					postion: "header" | "footer";
				}>(MENU_COLLECTION)
				.getOne(id);
		},
	});
}
