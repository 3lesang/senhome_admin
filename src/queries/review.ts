import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { PRODUCT_REVIEW_QUERY_KEY } from "@/constants";

type PaginationResponse<T> = {
	data: T[];
	page: number;
	page_size: number;
	total_items: number;
	total_pages: number;
};

type ReviewData = {
	id: number;
	rating: number;
	comment: string;
	customer: {
		id: number;
		name: string;
	};
	files: string[];
};

export function getReviewsByProductQueryOptions({
	page,
	limit,
	productId,
}: {
	page: number;
	limit: number;
	productId: number;
}) {
	return queryOptions({
		queryKey: [PRODUCT_REVIEW_QUERY_KEY, productId, page, limit],
		queryFn: () => {
			return axiosClient.get<PaginationResponse<ReviewData>>(
				`/reviews/products/${productId}`,
				{
					params: { page, page_size: limit },
				},
			);
		},
	});
}
