import { queryOptions } from "@tanstack/react-query";
import { ORDER_ITEM_COLLECTION } from "@/pocketbase/constants";

export const getListItemOrderQueryOptions = (orderId: string) => {
	return queryOptions({
		queryKey: [ORDER_ITEM_COLLECTION, orderId],
		queryFn: async () => {},
	});
};
