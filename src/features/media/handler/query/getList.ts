import type { FileType } from "@/features/media/components/schema";
import pocketClient from "@/lib/pocketbase";
import { FILE_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";
import type { ListResult } from "pocketbase";

export const mediaQueryOptions = (page: number, limit: number) =>
  queryOptions<ListResult<FileType>>({
    queryKey: [FILE_COLLECTION, page, limit],
    queryFn: () =>
      pocketClient.collection(FILE_COLLECTION).getList(page, limit, {
        expand: "image",
        sort: "-created",
      }),
  });
