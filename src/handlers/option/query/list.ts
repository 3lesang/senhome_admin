import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import {
	PRODUCT_OPTION_COLLECTION,
	PRODUCT_OPTION_VALUE_COLLECTION,
} from "@/pocketbase/constants";

export function getOptionsProductQueryOptions(productId: string) {
	return queryOptions({
		queryKey: [PRODUCT_OPTION_COLLECTION, productId],
		queryFn: async () => {
			const options = await pocketClient
				.collection<{
					id: string;
					name: string;
					values: { id: string; name: string }[];
				}>(PRODUCT_OPTION_COLLECTION)
				.getFullList({
					filter: `product="${productId}"`,
					fields: "id,name",
				});
			for (const option of options) {
				const values = await pocketClient
					.collection<{ id: string; name: string }>(
						PRODUCT_OPTION_VALUE_COLLECTION,
					)
					.getFullList({ filter: `option="${option.id}"`, fields: "id,name" });
				option.values = values;
			}
			return options;
		},
	});
}
