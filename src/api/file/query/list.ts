import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { FILE_COLLECTION } from "@/pocketbase/constants";

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
				.getList(page, limit, { filter: query });
		},
	});
}
