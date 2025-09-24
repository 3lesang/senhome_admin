import { queryOptions } from "@tanstack/react-query";
import { FILE_COLLECTION } from "@/pocketbase/constants";
import { getListFilePocket } from "@/pocketbase/file/list";

type GetListQueryOptionType = {
	page: number;
	limit: number;
	query: string;
};

export const getListFileQueryOptions = (queries: GetListQueryOptionType) => {
	const { page, limit, query } = queries;
	return queryOptions({
		queryKey: [FILE_COLLECTION, page, limit, query],
		queryFn: () => getListFilePocket({ page, limit, filter: query }),
	});
};
