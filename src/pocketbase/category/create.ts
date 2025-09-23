import pocketClient from "../client";
import { CATEGORY_COLLECTION } from "../constants";

type CreateCategoryPayload = {
	name: string;
};

async function createCategoryPocket(payload: CreateCategoryPayload) {
	return pocketClient.collection(CATEGORY_COLLECTION).create(payload);
}

export { createCategoryPocket };
