import pocketClient from "@/pocketbase/client";
import { FILE_COLLECTION } from "@/pocketbase/constants";
import type { FileDataType } from "@/types/file";

type GetListQueryPocketType = {
	page: number;
	limit: number;
	filter: string;
};

async function getListFilePocket(queries: GetListQueryPocketType) {
	const { page, limit, filter } = queries;
	return pocketClient
		.collection<FileDataType>(FILE_COLLECTION)
		.getList(page, limit, {
			filter,
			sort: "-created",
		});
}

export { getListFilePocket };
