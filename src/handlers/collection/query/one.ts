import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

type CollectionDataType = {
	id: string;
	name: string;
	slug: string;
	content: string;
	type: "manual" | "smart";
	seo: { title: string; description: string };
	schedule: Date;
	expand: {
		file: { id: string; collectionName: string; file: string };
	};
};

export const getOneCollectionQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: [COLLECTION_COLLECTION, id],
		queryFn: () => {
			return pocketClient
				.collection<CollectionDataType>(COLLECTION_COLLECTION)
				.getOne(id, {
					fields: "id,name,slug,content,type,seo,expand",
					expand: "file",
				});
		},
	});
};
