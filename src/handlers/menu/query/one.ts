import { queryOptions } from "@tanstack/react-query";
import { MENU_COLLECTION } from "@/pocketbase/constants";
import { getOneMenuPocket } from "@/pocketbase/menu/one";

export const getOneMenuQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: [MENU_COLLECTION, id],
		queryFn: () => getOneMenuPocket(id),
	});
};
