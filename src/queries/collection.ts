import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { COLLECTION_QUERY_KEY } from "@/constants";

type Params = {
	page: number;
	limit: number;
	query: string;
};

type PaginationResponse<T> = {
	data: T[];
	page: number;
	page_size: number;
	total_items: number;
	total_pages: number;
};

type CollectionData = {
	id: number;
	name: string;
	file: string;
};

export function getCollectionsQueryOptions({ page, limit, query }: Params) {
	return queryOptions({
		queryKey: [COLLECTION_QUERY_KEY, page, limit, query],
		queryFn: () => {
			return axiosClient.get<PaginationResponse<CollectionData>>(
				"/collections",
			);
		},
	});
}

type CollectionResponse = {
	name: string;
	slug: string;
	meta_title: string;
	meta_description: string;
	file: string;
	conditions: string;
	layout: string;
	products: { id: number; name: string; file: string }[];
};

export const getCollectionQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: [COLLECTION_QUERY_KEY, id],
		queryFn: () => {
			return axiosClient.get<CollectionResponse>(`/collections/${id}`);
		},
	});
};
