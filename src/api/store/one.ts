import { queryOptions } from "@tanstack/react-query";
import { STORE_COLLECTION } from "@/pocketbase";

export const getStoreQueryOptions = () =>
	queryOptions({
		queryKey: [STORE_COLLECTION],
		queryFn: () => {},
	});
