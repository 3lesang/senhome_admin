import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import { PRODUCT_COLLECTION, pocketClient } from "@/pocketbase";

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
		select(data) {
			return {
				id: data.id,
				name: data.name,
				content: data.content,
				slug: data.slug,
				price: data.price,
				sale_price: data.sale_price,
				file: data.expand.file.map((f) => ({
					id: f.id,
					url: convertToFileUrl(f),
				})),
				seo: { title: data.seo.title, description: data.seo.description },
				status: data.status,
				tag: data.tag,
			};
		},
	});
}
