import type { FileDataType } from "@/features/file/types";
import pocketClient from "@/pocketbase/client";
import { FILE_COLLECTION } from "@/pocketbase/constants";
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
