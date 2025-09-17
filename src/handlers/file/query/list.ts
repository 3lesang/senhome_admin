import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import { FILE_COLLECTION } from "@/pocketbase/constants";
import { getListFilePocket } from "@/pocketbase/file/list";
import type { FileType } from "@/types/file";

type GetListQueryOptionType = {
	page?: number;
	limit?: number;
	query?: string;
};

export const getListFileQueryOptions = (queries: GetListQueryOptionType) => {
	const { page = 1, limit = 10, query = "" } = queries;
	return queryOptions({
		queryKey: [FILE_COLLECTION, page, limit, query],
		queryFn: () => getListFilePocket({ page, limit, filter: query }),
		select(data) {
			const items: FileType[] = data.items?.map((item: any) => {
				const file: FileType = {
					id: item?.id,
					url: convertToFileUrl(item) ?? "",
				};
				return file;
			});

			return { ...data, items };
		},
	});
};
