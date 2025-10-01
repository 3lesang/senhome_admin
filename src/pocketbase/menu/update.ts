import type { MenuFormValuesType } from "@/components/menu-form";
import pocketClient from "../client";
import { MENU_COLLECTION } from "../constants";

export type UpadteMenuPayload = {
	name: string;
	position: string;
	items: MenuFormValuesType["items"];
};

async function updateMenuPocket(id: string, payload: UpadteMenuPayload) {
	return pocketClient.collection(MENU_COLLECTION).update(id, payload);
}

export { updateMenuPocket };
