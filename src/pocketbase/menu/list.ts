import type { ListResult } from "pocketbase";
import pocketClient from "@/pocketbase/client";
import { MENU_COLLECTION } from "@/pocketbase/constants";
import type { GetListQueryPocketType } from "@/pocketbase/types";
import type { MenuType } from "@/types/menu";

async function getListMenuPocket(
	queries: GetListQueryPocketType,
): Promise<ListResult<MenuType>> {
	const { page, limit, filter } = queries;
	return pocketClient.collection(MENU_COLLECTION).getList(page, limit, {
		sort: "-created",
		filter,
	});
}

export { getListMenuPocket };
