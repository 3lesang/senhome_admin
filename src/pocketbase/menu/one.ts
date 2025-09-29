import type { MenuType } from "@/types/menu";
import pocketClient from "../client";
import { MENU_COLLECTION } from "../constants";

async function getOneMenuPocket(id: string) {
	return pocketClient.collection<MenuType>(MENU_COLLECTION).getOne(id);
}

export { getOneMenuPocket };
