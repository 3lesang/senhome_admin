import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";
import type { FileType } from "@/types/file";

const convertToFileList = (files?: any): FileType[] => {
	const formatted: FileType[] = files?.map((item: any) => {
		const file: FileType = {
			id: item?.expand?.file.id,
			url: convertToFileUrl(item?.expand?.file) ?? "",
		};
		return file;
	});
	return formatted;
};

export const productFilesQueryOptions = (productId: string) =>
	queryOptions({
		queryKey: [FILE_GRAPH_COLLECTION, productId],
		queryFn: () =>
			pocketClient.collection(FILE_GRAPH_COLLECTION).getFullList({
				filter: `product = "${productId}"`,
				expand: "file",
				sort: "order",
			}),
		select(data) {
			return convertToFileList(data);
		},
	});
