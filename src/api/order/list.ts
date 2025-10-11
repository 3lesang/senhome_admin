import { queryOptions } from "@tanstack/react-query";
import { ORDER_COLLECTION, pocketClient } from "@/pocketbase";

type OrderDataType = {
	id: string;
	name: string;
	email: string;
	phone: string;
	final_price: number;
	created: Date;
};

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
				.collection<OrderDataType>(ORDER_COLLECTION)
				.getList(page, limit, { filter: query });
		},
	});
};
