import { queryOptions } from "@tanstack/react-query";
import {
	COLLECTION_COLLECTION,
	COLLECTION_PRODUCT_COLLECTION,
	pocketClient,
} from "@/pocketbase";

type CollectionsDataType = {
	id: string;
	name: string;
	created: Date;
	expand: { file: { id: string; collectionName: string; file: string } };
};

export function getCollectionsQueryOptions({
	page,
	limit,
	query,
}: {
	page: number;
	limit: number;
	query: string;
}) {
	return queryOptions({
		queryKey: [COLLECTION_COLLECTION, page, limit, query],
		queryFn: () => {
			return pocketClient
				.collection<CollectionsDataType>(COLLECTION_COLLECTION)
				.getList(page, limit, {
					filter: query,
					fields: "id,name,created,expand",
					expand: "file",
				});
		},
	});
}

type CollectionProductDataType = {
	expand: {
		collection: { id: string; name: string };
	};
};

export function getCollectionsProductQueryOptions(productId: string) {
	return queryOptions({
		queryKey: [COLLECTION_PRODUCT_COLLECTION, productId],
		queryFn: () => {
			return pocketClient
				.collection<CollectionProductDataType>(COLLECTION_PRODUCT_COLLECTION)
				.getFullList({
					filter: `product="${productId}"`,
					fields: "expand.collection.id,expand.collection.name",
					expand: "collection",
				});
		},
		select(data) {
			return data.map((i) => ({
				id: i.expand.collection.id,
				name: i.expand.collection.name,
			}));
		},
	});
}
