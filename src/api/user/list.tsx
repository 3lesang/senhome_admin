import { queryOptions } from "@tanstack/react-query";
import { pocketClient, USER_COLLECTION } from "@/pocketbase";

export function getFullListUsersQueryOptions() {
	return queryOptions({
		queryKey: [USER_COLLECTION],
		queryFn: () => {
			return pocketClient
				.collection<{ id: string; name: string }>(USER_COLLECTION)
				.getFullList();
		},
	});
}
