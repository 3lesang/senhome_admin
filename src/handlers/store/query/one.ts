import { queryOptions } from "@tanstack/react-query";
import { STORE_COLLECTION } from "@/pocketbase/constants";
import { getStorePocket } from "@/pocketbase/store/one";

export const getStoreQueryOptions = () =>
	queryOptions({
		queryKey: [STORE_COLLECTION],
		queryFn: getStorePocket,
		select(data) {
			return data?.[0];
		},
	});
