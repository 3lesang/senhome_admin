import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import {
	COLLECTION_COLLECTION,
	COLLECTION_PRODUCT_COLLECTION,
} from "@/pocketbase/constants";

type CollectionsDataType = {
	id: string;
	name: string;
	created: Date;
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
				.getList(page, limit, { filter: query, fields: "id,name,created" });
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
