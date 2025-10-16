import { queryOptions } from "@tanstack/react-query";
import { ORDER_COLLECTION, pocketClient } from "@/pocketbase";

export function getOrder(orderId: string) {
	return queryOptions({
		queryKey: [ORDER_COLLECTION, orderId],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					status: "created";
					total_price: number;
					total_discount: number;
					final_price: number;
					customer: {
						name: string;
						phome: string;
						email: string;
						address: {
							street: string;
							province: { label: string; value: string };
							district: { label: string; value: string };
							ward: { label: string; value: string };
						};
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
				.getOne(orderId);
		},
	});
}
