import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { CATEGORY_QUERY_KEY } from "@/constants";

export function getCategoriesQueryOptions() {
	return queryOptions({
		queryKey: [CATEGORY_QUERY_KEY],
		queryFn: () => {
			return axiosClient.get("/categories");
		},
	});
}
