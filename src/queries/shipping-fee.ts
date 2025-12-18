import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { SHIPPING_FEE_QUERY_KEY } from "@/constants";

type PaginationResponse<T> = {
	data: T[];
	page: number;
	page_size: number;
	total_items: number;
	total_pages: number;
};

type ShippingFeeListData = {
	id: number;
	min_weight: number;
	max_weight: number;
	fee_amount: number;
	min_order_value: number;
	free_shipping: boolean;
};

type Params = {
	page: number;
	limit: number;
};

export function getShippingFeesQueryOptions(params: Params) {
	return queryOptions({
		queryKey: [SHIPPING_FEE_QUERY_KEY, params.page, params.limit],
		queryFn: () => {
			return axiosClient.get<PaginationResponse<ShippingFeeListData>>(
				"/shipping-fees",
				{ params },
			);
		},
	});
}

type ShippingFeeData = {
	id: number;
	min_weight: number;
	max_weight: number;
	fee_amount: number;
	min_order_value: number;
	free_shipping: boolean;
};

export function getShippingFeeQueryOptions(shippingFeeID: string) {
	return queryOptions({
		queryKey: [SHIPPING_FEE_QUERY_KEY, shippingFeeID],
		queryFn: () => {
			return axiosClient.get<ShippingFeeData>(
				`/shipping-fees/${shippingFeeID}`,
			);
		},
	});
}
