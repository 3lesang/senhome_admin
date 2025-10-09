import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { MENU_COLLECTION } from "@/pocketbase/constants";

type MenuDataType = {
	id: string;
	name: string;
	position: "header" | "footer";
};

export const getListMenuQueryOptions = ({
	page,
	limit,
	query,
}: {
	page: number;
	limit: number;
	query: string;
}) => {
	return queryOptions({
		queryKey: [MENU_COLLECTION, page, limit, query],
		queryFn: () => {
			return pocketClient
				.collection<MenuDataType>(MENU_COLLECTION)
				.getList(page, limit, { filter: query });
		},
	});
};
