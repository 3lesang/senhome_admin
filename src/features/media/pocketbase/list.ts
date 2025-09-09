import type { FileDataType } from "@/features/media/types";
import pocketClient from "@/lib/pocketbase";
import { FILE_COLLECTION } from "@/shared/constants/pocketbase";
import type { ListResult } from "pocketbase";

export type GetListQueryPocketType = {
  page: number;
  limit: number;
  filter: string;
};

async function getListFilePocket(
  queries: GetListQueryPocketType
): Promise<ListResult<FileDataType>> {
  const { page, limit, filter } = queries;
  return pocketClient.collection(FILE_COLLECTION).getList(page, limit, {
    filter,
    sort: "-created",
  });
}

export { getListFilePocket };
