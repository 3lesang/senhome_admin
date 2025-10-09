import { queryOptions } from "@tanstack/react-query";
import { STORE_COLLECTION } from "@/pocketbase/constants";

export const getStoreQueryOptions = () =>
	queryOptions({
		queryKey: [STORE_COLLECTION],
		queryFn: () => {},
	});
