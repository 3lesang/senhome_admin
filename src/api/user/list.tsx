import { queryOptions } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "@/constants";
import { pocketClient, USER_COLLECTION } from "@/pocketbase";

export function getFullListUsersQueryOptions() {
	return queryOptions({
		queryKey: [USER_QUERY_KEY],
		queryFn: () => {
			return pocketClient
				.collection<{ id: string; name: string }>(USER_COLLECTION)
				.getFullList();
		},
	});
}
