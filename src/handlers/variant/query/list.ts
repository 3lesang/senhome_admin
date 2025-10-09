import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_VARIANT_COLLECTION } from "@/pocketbase/constants";

type VariantDataType = {
	id: string;
	price: number;
	sale_price: number;
	stock: number;
	sku: string;
	combos: string;
	expand: {
		file: { id: string; collectionName: string; file: string };
	};
};

export function getVariantsProductQueryOptions(productId: string) {
	return queryOptions({
		queryKey: [PRODUCT_VARIANT_COLLECTION, productId],
		queryFn: () => {
			return pocketClient
				.collection<VariantDataType>(PRODUCT_VARIANT_COLLECTION)
				.getFullList({
					filter: `product="${productId}"`,
					fields: "id,name,price,sale_price,stock,sku,combos,expand",
					expand: "file",
				});
		},
	});
}
