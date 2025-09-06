import { formatToMedia } from "@/lib/format";
import pocketClient from "@/lib/pocketbase";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

export const productFilesQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: [FILE_GRAPH_COLLECTION, productId],
    queryFn: () =>
      pocketClient.collection(FILE_GRAPH_COLLECTION).getFullList({
        filter: `product = "${productId}"`,
        expand: "file",
      }),
    select(data) {
      return formatToMedia(data);
    },
  });
