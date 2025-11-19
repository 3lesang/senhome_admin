import axiosClient from "@/axios";
import { DISCOUNT_QUERY_KEY } from "@/constants";
import { queryOptions } from "@tanstack/react-query";

type Params = {
  page: number;
  limit: number;
};

type DiscountData = {
  id: number;
  title: string;
  code: string;
  discount_type: string;
  status: string;
  usage_limit: number;
  usage_count: number;
  per_customer_limit: number;
};

type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

export function getDiscountsQueryOptions(params: Params) {
  return queryOptions({
    queryKey: [DISCOUNT_QUERY_KEY, params.page, params.limit],
    queryFn: () => {
      return axiosClient.get<PaginationResponse<DiscountData>>("/discounts");
    },
  });
}

type OneDiscountData = {
  id: number;
  title: string;
  code: string;
  discount_type: string;
  status: string;
  usage_limit: number;
  per_customer_limit: number;
  starts_at: Date;
  effects: {
    applies_to: string;
    effect_type: string;
    id: number;
    value: string;
  }[];
  conditions: {
    id: number;
    condition_type: string;
    value: string;
  }[];
};

export function getDiscountQueryOptions(discountID: string) {
  return queryOptions({
    queryKey: [DISCOUNT_QUERY_KEY, discountID],
    queryFn: () => {
      return axiosClient.get<OneDiscountData>(`/discounts/${discountID}`);
    },
  });
}
