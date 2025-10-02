import pocketClient from "../client";
import { MENU_COLLECTION } from "../constants";

type MenuItem = {
	id: string;
	title: string;
	url: string | null;
	parentId: string | null;
	order: number;
};

export type CreateMenuPayload = {
	name: string;
	position: string;
	items: MenuItem[];
};

async function createMenuPocket(payload: CreateMenuPayload) {
	return pocketClient.collection(MENU_COLLECTION).create(payload);
}

export { createMenuPocket };
