import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import {
	COLLECTION_PRODUCT_COLLECTION,
	PRODUCT_COLLECTION,
	pocketClient,
} from "@/pocketbase";

type ProductDataType = {
	id: string;
	name: string;
	status: "active" | "draft";
	expand: {
		thumbnail: { id: string; file: string; collectionName: string };
	};
};

export function getListProductQueryOptions({
	page,
	limit,
	query,
}: {
	page: number;
	limit: number;
	query: string;
}) {
	return queryOptions({
		queryKey: [PRODUCT_COLLECTION, page, limit, query],
		queryFn: () => {
			return pocketClient
				.collection<ProductDataType>(PRODUCT_COLLECTION)
				.getList(page, limit, {
					filter: query,
					fields: "id,name,file,status,expand",
					expand: "thumbnail",
					sort: "-created",
				});
		},
	});
}

type ProductCollectionType = {
	expand: {
		product: {
			id: string;
			name: string;
			expand: {
				thumbnail: { id: string; collectionName: string; file: string };
			};
		};
	};
};

export function getProductsCollectionQueryOptions(collectionId: string) {
	return queryOptions({
		queryKey: [PRODUCT_COLLECTION, collectionId],
		queryFn: () => {
			return pocketClient
				.collection<ProductCollectionType>(COLLECTION_PRODUCT_COLLECTION)
				.getFullList({
					fields: "expand.product.id,expand.product.name,expand.product.expand",
					filter: `collection="${collectionId}"`,
					expand: "product.thumbnail",
				});
		},
		select(data) {
			return data.map((i) => ({
				id: i.expand.product.id,
				name: i.expand.product.name,
				thumbnail: convertToFileUrl(i.expand.product.expand.thumbnail),
			}));
		},
	});
}
