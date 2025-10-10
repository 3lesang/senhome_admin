import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

type CollectionDataType = {
	id: string;
	name: string;
	content: string;
	slug: string;
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
		select(data) {
			return {
				name: data.name,
				content: data.content,
				slug: data.slug,
				type: data.type,
				seo: { title: data.seo.title, description: data.seo.description },
				schedule: data.schedule,
				file: data.expand.file?.id
					? {
							id: data.expand.file.id,
							url: convertToFileUrl(data.expand.file),
						}
					: null,
			};
		},
	});
};
