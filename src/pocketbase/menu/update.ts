import pocketClient from "../client";
import { MENU_COLLECTION } from "../constants";

type MenuItem = {
	id: string;
	title: string;
	url: string | null;
	parentId: string | null;
	order: number;
};

export type UpadteMenuPayload = {
	name: string;
	position: string;
	items: MenuItem[];
};

async function updateMenuPocket(id: string, payload: UpadteMenuPayload) {
	return pocketClient.collection(MENU_COLLECTION).update(id, payload);
}

export { updateMenuPocket };
