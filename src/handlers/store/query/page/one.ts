import { queryOptions } from "@tanstack/react-query";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";
import { getOneStorePagePocket } from "@/pocketbase/store/page/one";

export const getOneStorePageQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: [STORE_PAGE_COLLECTION, id],
		queryFn: () => getOneStorePagePocket(id),
	});
};
