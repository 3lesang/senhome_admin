import { queryOptions } from "@tanstack/react-query";
import type { JSONContent } from "@tiptap/core";
import axiosClient from "@/axios";
import { PRODUCT_QUERY_KEY } from "@/constants";

type Params = {
	page: number;
	limit: number;
};

type ProductData = {
	id: number;
	name: string;
	file: string;
	is_active: boolean;
};

type PaginationResponse<T> = {
	data: T[];
	page: number;
	page_size: number;
	total_items: number;
	total_pages: number;
};

type OneProduct = {
	id: number;
	name: string;
	slug: string;
	origin_price: number;
	sale_price: number;
	stock: number;
	sku: string;
	weight: number;
	long: number;
	wide: number;
	high: number;
	meta_title: string;
	meta_description: string;
	category_id: number;
	is_active: boolean;
	files: string[];
	tags: string[];
	options: {
		id?: number;
		name: string;
		values?: { id?: number; name: string }[];
	}[];
	variants: {
		id?: number;
		file: string;
		origin_price: number;
		sale_price: number;
		stock: number;
		discount: number;
		sku: string;
		options: { option_name: string; value: string }[];
	}[];
	collections: { id: number; name: string }[];
};

export function getProductsQueryOptions(params: Params) {
	return queryOptions({
		queryKey: [PRODUCT_QUERY_KEY, params.page, params.limit],
		queryFn: () => {
			return axiosClient.get<PaginationResponse<ProductData>>("/products", {
				params: { page: params.page, page_size: params.limit },
			});
		},
	});
}

export function getProductQueryOptions(id: string) {
	return queryOptions({
		queryKey: [PRODUCT_QUERY_KEY, id],
		queryFn: () => {
			return axiosClient.get<OneProduct>(`/products/${id}`);
		},
	});
}

export function getProductContentQueryOptions(slug: string) {
	return queryOptions({
		queryKey: [PRODUCT_QUERY_KEY, slug],
		queryFn: () => {
			return axiosClient.get<JSONContent>(
				`https://bucket.senhome.vn/content/product/${slug}`,
			);
		},
	});
}
