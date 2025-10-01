import type { MenuFormValuesType } from "@/components/menu-form";
import pocketClient from "../client";
import { MENU_COLLECTION } from "../constants";

export type CreateMenuPayload = {
	name: string;
	position: string;
	items: MenuFormValuesType["items"];
};

async function createMenuPocket(payload: CreateMenuPayload) {
	return pocketClient.collection(MENU_COLLECTION).create(payload);
}

export { createMenuPocket };
