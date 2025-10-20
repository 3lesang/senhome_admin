import { queryOptions } from "@tanstack/react-query";
import { CATEGORY_COLLECTION, pocketClient } from "@/pocketbase";

export function getFullListCategoryQueryOptions() {
	return queryOptions({
		queryKey: [CATEGORY_COLLECTION],
		queryFn: () => {
			return pocketClient
				.collection<{ id: string; name: string }>(CATEGORY_COLLECTION)
				.getFullList();
		},
	});
}

type CategoryDataType = {
	id: string;
	name: string;
	created: Date;
};

export function getListCategoryQueryOptions({
	page,
	limit,
	query,
}: {
	page: number;
	limit: number;
	query: string;
}) {
	return queryOptions({
		queryKey: [CATEGORY_COLLECTION, page, limit],
		queryFn: () => {
			return pocketClient
				.collection<CategoryDataType>(CATEGORY_COLLECTION)
				.getList(page, limit, { filter: query });
		},
	});
}
