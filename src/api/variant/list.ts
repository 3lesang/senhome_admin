import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import { PRODUCT_VARIANT_COLLECTION, pocketClient } from "@/pocketbase";

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
		select(data) {
			return data.map((v) => ({
				id: v.id,
				price: v.price,
				sale_price: v.sale_price,
				stock: v.stock,
				sku: v.sku,
				file: v.expand.file?.id
					? {
							id: v.expand.file.id,
							url: convertToFileUrl(v.expand.file),
						}
					: null,
				combos: v.combos,
			}));
		},
	});
}
