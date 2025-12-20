import { queryOptions } from "@tanstack/react-query";
import type { JSONContent } from "@tiptap/core";
import axiosClient from "@/axios";
import { STORE_PAGE_QUERY_KEY } from "@/constants";

type PageData = {
	id: number;
	name: string;
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
	query: string;
};

export const getPagesQueryOptions = ({ page, limit, query }: Params) => {
	return queryOptions({
		queryKey: [STORE_PAGE_QUERY_KEY, page, limit, query],
		queryFn: () => {
			return axiosClient.get<PaginationResponse<PageData>>("/pages", {
				params: { page, page_size: limit },
			});
		},
	});
};

export function getPageQueryOptions(pageID: string) {
	return queryOptions({
		queryKey: [STORE_PAGE_QUERY_KEY, pageID],
		queryFn: () => {
			return axiosClient.get<PageData>(`/pages/${pageID}`);
		},
	});
}

export function getPageContentQueryOptions(pageId: string) {
	return queryOptions({
		queryKey: ["page-content", pageId],
		queryFn: () => {
			return axiosClient.get<JSONContent>(
				`https://bucket.senhome.vn/page/${pageId}`,
			);
		},
	});
}
