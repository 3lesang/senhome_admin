import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { CATEGORY_QUERY_KEY } from "@/constants";

type Params = {
  page: number;
  limit: number;
};

type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

type CategoryData = {
  id: number;
  name: string;
  slug: string;
};

export function getCategoriesQueryOptions(params: Params) {
  return queryOptions({
    queryKey: [CATEGORY_QUERY_KEY, params.page, params.limit],
    queryFn: () => {
      return axiosClient.get<PaginationResponse<CategoryData>>("/categories", {
        params: { page: params.page, page_size: params.limit },
      });
    },
  });
}

export function getCategoryQueryOptions(categoryID: string) {
  return queryOptions({
    queryKey: [CATEGORY_QUERY_KEY, categoryID],
    queryFn: () => {
      return axiosClient.get<CategoryData>(`/categories/${categoryID}`);
    },
  });
}
