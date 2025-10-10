import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { MENU_COLLECTION } from "@/pocketbase/constants";

export function getOneMenuQueryOptions(id: string) {
	return queryOptions({
		queryKey: [MENU_COLLECTION, id],
		queryFn: () => {
			return pocketClient.collection(MENU_COLLECTION).getOne(id);
		},
	});
}
