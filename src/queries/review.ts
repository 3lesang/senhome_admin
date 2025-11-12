import { queryOptions } from "@tanstack/react-query";
import { PRODUCT_REVIEW_QUERY_KEY } from "@/constants";
import axiosClient from "@/axios";

type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

type ReviewData = {
  id: number;
  rating: number;
  comment: string;
  customer: {
    id: number;
    name: string;
  };
  files: string[];
};

export function getReviewsByProductQueryOptions({
  page,
  limit,
  productId,
}: {
  page: number;
  limit: number;
  productId: string;
}) {
  return queryOptions({
    queryKey: [PRODUCT_REVIEW_QUERY_KEY, productId],
    queryFn: () => {
      return axiosClient.get<PaginationResponse<ReviewData>>(
        `/reviews/products/${productId}`,
        {
          params: { page, page_size: limit },
        },
      );
    },
  });
}
