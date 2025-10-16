import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { FILE_COLLECTION, pocketClient } from "@/pocketbase";

type FileDataType = {
	id: string;
	collectionName: string;
	file: string;
};

export function getListFileQueryOptions({
	page,
	limit,
	query,
}: {
	page: number;
	limit: number;
	query: string;
}) {
	return queryOptions({
		queryKey: [FILE_COLLECTION, page, limit, query],
		queryFn: () => {
			return pocketClient
				.collection<FileDataType>(FILE_COLLECTION)
				.getList(page, limit, { filter: query, sort: "-created" });
		},
	});
}

export function getFilesInfinityQueyrOptions() {
	return infiniteQueryOptions({
		queryKey: [FILE_COLLECTION],
		queryFn: ({ pageParam }) => {
			return pocketClient
				.collection<FileDataType>(FILE_COLLECTION)
				.getList(pageParam, 20, { sort: "-created" });
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
	});
}
