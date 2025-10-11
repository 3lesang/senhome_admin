import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import { COLLECTION_COLLECTION, pocketClient } from "@/pocketbase";

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
	layout: "default" | "hero" | "home";
	conditions: string;
};

export const getOneCollectionQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: [COLLECTION_COLLECTION, id],
		queryFn: () => {
			return pocketClient
				.collection<CollectionDataType>(COLLECTION_COLLECTION)
				.getOne(id, {
					fields:
						"id,name,slug,content,type,seo,layout,conditions,schedule,expand",
					expand: "file",
				});
		},
		select(data) {
			return {
				id: data.id,
				name: data.name,
				content: data.content,
				slug: data.slug,
				type: data.type,
				seo: { title: data.seo.title, description: data.seo.description },
				schedule: new Date(data.schedule),
				file: data.expand.file?.id
					? {
							id: data.expand.file.id,
							url: convertToFileUrl(data.expand.file),
						}
					: null,
				layout: data.layout,
				conditions: data.conditions,
			};
		},
	});
};
