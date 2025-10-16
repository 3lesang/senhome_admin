import { queryOptions } from "@tanstack/react-query";
import {
	ORDER_COLLECTION,
	ORDER_ITEM_COLLECTION,
	pocketClient,
} from "@/pocketbase";

export const getListOrderQueryOptions = ({
	page,
	limit,
	query,
}: {
	page: number;
	limit: number;
	query: string;
}) => {
	return queryOptions({
		queryKey: [ORDER_COLLECTION, page, limit, query],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					total_price: number;
					total_discount: number;
					final_price: number;
					created: Date;
					customer: {
						name: string;
					};
					payment_status:
						| "pending"
						| "processing"
						| "paid"
						| "failed"
						| "cancelled"
						| "refunded"
						| "expired";
					shipping_status:
						| "pending"
						| "processing"
						| "shipped"
						| "delivered"
						| "returned"
						| "cancelled";
				}>(ORDER_COLLECTION)
				.getList(page, limit, { filter: query, sort: "-created" });
		},
	});
};

export function getItemsOrder(orderId: string) {
	return queryOptions({
		queryKey: [ORDER_ITEM_COLLECTION, orderId],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					price: number;
					sale_price: number;
					quantity: number;
					expand: {
						product: {
							id: string;
							name: string;
							slug: string;
							expand: {
								thumbnail: {
									id: string;
									collectionName: string;
									file: string;
								};
							};
						};
						variant: {
							combos: string;
						};
					};
				}>(ORDER_ITEM_COLLECTION)
				.getList(1, 10, {
					filter: `order="${orderId}"`,
					expand: "product.thumbnail,variant",
				});
		},
	});
}
