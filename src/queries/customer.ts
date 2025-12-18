import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { CUSTOMER_QUERY_KEY } from "@/constants";

type CustomerData = {
  id: number;
  name: string;
  phone: string;
};

type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

export function getCustomersQueryOptions(params?: {
  page: number;
  limit: number;
}) {
  return queryOptions({
    queryKey: [CUSTOMER_QUERY_KEY, params?.page, params?.limit],
    queryFn: () => {
      return axiosClient.get<PaginationResponse<CustomerData>>("/customers", {
        params,
      });
    },
  });
}
