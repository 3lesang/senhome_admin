import { queryOptions } from "@tanstack/react-query";
import {
	PRODUCT_OPTION_COLLECTION,
	PRODUCT_OPTION_VALUE_COLLECTION,
	pocketClient,
} from "@/pocketbase";

type ValueDataType = {
	id: string;
	name: string;
};

type OptionDateType = {
	id: string;
	name: string;
	values: ValueDataType[];
};

export function getOptionsProductQueryOptions(productId: string) {
	return queryOptions({
		queryKey: [PRODUCT_OPTION_COLLECTION, productId],
		queryFn: async () => {
			const options = await pocketClient
				.collection<OptionDateType>(PRODUCT_OPTION_COLLECTION)
				.getFullList({
					filter: `product="${productId}"`,
					fields: "id,name",
				});
			for (const option of options) {
				const values = await pocketClient
					.collection<ValueDataType>(PRODUCT_OPTION_VALUE_COLLECTION)
					.getFullList({ filter: `option="${option.id}"`, fields: "id,name" });
				option.values = values;
			}
			return options;
		},
	});
}
