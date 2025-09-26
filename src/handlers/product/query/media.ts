import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import pocketClient from "@/pocketbase/client";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";
import type { FileType } from "@/types/file";

// Define the shape of a single file graph record returned by PocketBase
type FileGraphRecord = {
	id: string;
	expand: {
		file: {
			id: string;
			collectionName: string;
			file: { id: string };
			// Add more fields if needed, e.g., filename, type, etc.
		};
	};
};

const convertToFileList = (
	files?: FileGraphRecord[],
): FileType[] | undefined => {
	return files?.map((item) => ({
		id: item.expand.file.id,
		url: convertToFileUrl(item.expand.file) ?? "",
	}));
};

export const productFilesQueryOptions = (productId: string) =>
	queryOptions({
		queryKey: [FILE_GRAPH_COLLECTION, productId],
		queryFn: () =>
			pocketClient
				.collection<FileGraphRecord>(FILE_GRAPH_COLLECTION)
				.getFullList({
					filter: `product = "${productId}"`,
					expand: "file",
					sort: "order",
				}),
		select(data) {
			return convertToFileList(data);
		},
	});
