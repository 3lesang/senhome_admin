import pocketClient from "../client";
import { MENU_COLLECTION } from "../constants";

export type CreateMenuPayload = {
	name: string;
	position: string;
};

async function createMenuPocket(payload: CreateMenuPayload) {
	return pocketClient.collection(MENU_COLLECTION).create(payload);
}

export { createMenuPocket };
