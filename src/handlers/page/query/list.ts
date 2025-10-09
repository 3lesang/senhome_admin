import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";

type StorePageDateType = {
	id: string;
	title: string;
	created: Date;
};

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
		queryKey: [STORE_PAGE_COLLECTION, page, limit, query],
		queryFn: () => {
			return pocketClient
				.collection<StorePageDateType>(STORE_PAGE_COLLECTION)
				.getList(page, limit, { filter: query });
		},
	});
};
