import type { FileType } from "@/features/media/types";
import pocketClient from "@/lib/pocketbase";
import { convertToFileUrl } from "@/lib/utils";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

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
      }),
    select(data) {
      return convertToFileList(data);
    },
  });
