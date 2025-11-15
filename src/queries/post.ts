import axiosClient from "@/axios";
import { POST_QUERY_KEY } from "@/constants";
import { queryOptions } from "@tanstack/react-query";
import type { JSONContent } from "@tiptap/core";

type PostData = {
  id: number;
  title: string;
  slug: string;
};

type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

type Params = {
  page: number;
  limit: number;
};

export function getPostsQueryOptions(params: Params) {
  return queryOptions({
    queryKey: [POST_QUERY_KEY, params.page, params.limit],
    queryFn: () => {
      return axiosClient.get<PaginationResponse<PostData>>("/posts", {
        params: { page: params.page, page_size: params.limit },
      });
    },
  });
}

export function getPostQueryOptions(postID: string) {
  return queryOptions({
    queryKey: [POST_QUERY_KEY, postID],
    queryFn: () => {
      return axiosClient.get<PostData>(`/posts/${postID}`);
    },
  });
}

export function getPostContentQueryOptions(postID: string) {
  return queryOptions({
    queryKey: ["post-content", postID],
    queryFn: () => {
      return axiosClient.get<JSONContent>(
        `https://bucket.senhome.vn/post/content/${postID}`,
      );
    },
  });
}
