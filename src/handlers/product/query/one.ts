import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";

type ProductData = {
	id: string;
	name: string;
	slug: string;
	content: string;
	price: number;
	sale_price: number;
	seo: {
		title: string;
		description: string;
	};
	status: "active" | "draft";
	tag: string;
	expand: {
		file: { id: string; collectionName: string; file: string }[];
	};
};

export function productQueryOptions(id: string) {
	return queryOptions({
		queryKey: [PRODUCT_COLLECTION, id],
		queryFn: () => {
			return pocketClient
				.collection<ProductData>(PRODUCT_COLLECTION)
				.getOne(id, {
					fields: "id,name,slug,content,price,sale_price,seo,status,tag,expand",
					expand: "file",
				});
		},
	});
}
