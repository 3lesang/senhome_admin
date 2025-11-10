import axiosClient from "@/axios";
import { FILE_QUERY_KEY } from "@/constants";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

type Params = {
  page: number;
  limit: number;
};

type FileData = {
  id: number;
  name: string;
};

type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

export function getFilesQueryOptions({ page, limit }: Params) {
  return queryOptions({
    queryKey: [FILE_QUERY_KEY, page, limit],
    queryFn: () => {
      return axiosClient.get<PaginationResponse<FileData>>("/files", {
        params: { page, page_size: limit },
      });
    },
  });
}

export function getFilesInfinityQueryOptions() {
  return infiniteQueryOptions({
    queryKey: [FILE_QUERY_KEY],
    queryFn: async ({ pageParam }) => {
      const res = await axiosClient.get<PaginationResponse<FileData>>(
        "/files",
        {
          params: { page: pageParam, page_size: 20 },
        },
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage;
      return page < total_pages ? page + 1 : undefined;
    },
  });
}
