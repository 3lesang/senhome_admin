import { queryOptions } from "@tanstack/react-query";
import { getOneCollectionPocket } from "@/pocketbase/collection/one";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

export const getOneCollectionQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: [COLLECTION_COLLECTION, id],
		queryFn: () => getOneCollectionPocket(id),
	});
};
