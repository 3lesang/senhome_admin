import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";

type ProductDataType = {
	id: string;
	name: string;
	status: "active" | "draft";
	expand: {
		file: { id: string; file: string; collectionName: string }[];
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
					fields: "id,name,file,expand,status",
					expand: "file",
					sort: "-created",
				});
		},
	});
}
