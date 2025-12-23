import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { ORDER_QUERY_KEY } from "@/constants";
import type { OrderStatus } from "@/pages/order/list";

type OrderData = {
	id: number;
	code: string;
	total_amount: number;
	discount_amount: number;
	shipping_fee_amount: number;
	full_name: string;
	address_line: string;
	email: string;
	created_at: Date;
	status: OrderStatus;
	items: {
		id: number;
		sale_price: number;
		product_id: number;
		product_sku: string;
		variant_sku: string;
		name: string;
		quantity: number;
		options: { option: string; value: string }[];
	}[];
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
	status?: string;
};

export function getOrdersQueryOptions(params: Params) {
	return queryOptions({
		queryKey: [ORDER_QUERY_KEY, params.page, params.limit, params.status],
		queryFn: () => {
			return axiosClient.get<PaginationResponse<OrderData>>("/orders", {
				params,
			});
		},
	});
}

type OrderResponse = {
	id: number;
	code: string;
	full_name: string;
	phone: string;
	email: string;
	address_line: string;
	total_amount: number;
	discount_amount: number;
	shipping_fee_amount: number;
	items: {
		id: number;
		sale_price: number;
		product_id: number;
		product_sku: string;
		variant_sku: string;
		name: string;
		quantity: number;
		options: { option: string; value: string }[];
	}[];
};

export function getOrderQueryOptions(orderId: string) {
	return queryOptions({
		queryKey: [ORDER_QUERY_KEY, orderId],
		queryFn: () => {
			return axiosClient.get<OrderResponse>(`/orders/${orderId}`);
		},
	});
}
