import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { ORDER_QUERY_KEY } from "@/constants";

type OrderData = {
	id: number;
	total_amount: number;
	discount_amount: number;
	created: Date;
};

type PaginationResponse<T> = {
	data: T[];
	page: number;
	page_size: number;
	total_items: number;
	total_pages: number;
};

export function getOrdersQueryOptions() {
	return queryOptions({
		queryKey: [ORDER_QUERY_KEY],
		queryFn: () => {
			return axiosClient.get<PaginationResponse<OrderData>>("/orders");
		},
	});
}

type OrderResponse = {
	id: number;
	full_name: string;
	phone: string;
	address_line: string;
	total_amount: number;
	discount_amount: number;
	items: {
		quantity: number;
		name: string;
		sale_price: number;
		product_id: number;
		options: Record<string, string>;
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
