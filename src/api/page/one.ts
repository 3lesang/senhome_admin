import { queryOptions } from "@tanstack/react-query";
import { pocketClient, STORE_PAGE_COLLECTION } from "@/pocketbase";

export function getOneStorePageQueryOptions(id: string) {
	return queryOptions({
		queryKey: [STORE_PAGE_COLLECTION, id],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					title: string;
					slug: string;
					content: string;
				}>(STORE_PAGE_COLLECTION)
				.getOne(id);
		},
	});
}
