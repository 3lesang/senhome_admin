import { queryOptions } from "@tanstack/react-query";
import { PRODUCT_REVIEW_COLLECTION, pocketClient } from "@/pocketbase";

export function getReviewsQueryOptions({
	page,
	limit,
}: {
	page: number;
	limit: number;
}) {
	return queryOptions({
		queryKey: [PRODUCT_REVIEW_COLLECTION],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					rating: number;
					content: string;
					expand: {
						user: { id: string; name: string };
						product: { id: string; name: string };
					};
				}>(PRODUCT_REVIEW_COLLECTION)
				.getList(page, limit, {
					expand: "user,product",
				});
		},
	});
}

export function getReviewsProductQueryOptions({
	page,
	limit,
	productId,
}: {
	page: number;
	limit: number;
	productId: string;
}) {
	return queryOptions({
		queryKey: [PRODUCT_REVIEW_COLLECTION, productId],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					rating: number;
					content: string;
					expand: {
						user: { id: string; name: string };
						product: { id: string; name: string };
					};
				}>(PRODUCT_REVIEW_COLLECTION)
				.getList(page, limit, {
					expand: "user,product",
					filter: `product="${productId}"`,
				});
		},
	});
}
