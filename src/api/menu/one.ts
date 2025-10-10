import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { MENU_COLLECTION } from "@/pocketbase/constants";

type MenuDataType = {
	id: string;
	name: string;
	postion: "header" | "footer";
};

export function getOneMenuQueryOptions(id: string) {
	return queryOptions({
		queryKey: [MENU_COLLECTION, id],
		queryFn: () => {
			return pocketClient.collection<MenuDataType>(MENU_COLLECTION).getOne(id);
		},
	});
}
