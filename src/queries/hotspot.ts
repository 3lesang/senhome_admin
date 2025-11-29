import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { HOTSPOT_QUERY_KEY } from "@/constants";

type Params = {
	page: number;
	limit: number;
};

type HotspotData = {
	id: number;
	file: string;
};

type PaginationResponse<T> = {
	data: T[];
	page: number;
	page_size: number;
	total_items: number;
	total_pages: number;
};

export function getHotspotsQueryOptions(params: Params) {
	return queryOptions({
		queryKey: [HOTSPOT_QUERY_KEY, params.page, params.limit],
		queryFn: () => {
			return axiosClient.get<PaginationResponse<HotspotData>>("/hotspots", {
				params: { page: params.page, page_size: params.limit },
			});
		},
	});
}

type SpotData = {
	id: number;
	x: number;
	y: number;
	product_id: number;
	product: { id: number; name: string; file: string };
};

type OneHotspotData = {
	id: number;
	file: string;
	spots: SpotData[];
};

export function getHotspotQueryOptions(hotspotID: string) {
	return queryOptions({
		queryKey: [HOTSPOT_QUERY_KEY, hotspotID],
		queryFn: () => {
			return axiosClient.get<OneHotspotData>(`/hotspots/${hotspotID}`);
		},
	});
}
