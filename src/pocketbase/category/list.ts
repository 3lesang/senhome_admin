import pocketClient from "../client";
import { CATEGORY_COLLECTION } from "../constants";

async function getListCategoryPocket() {
	const res = await pocketClient
		.collection(CATEGORY_COLLECTION)
		.getFullList({});
	return res;
}

export { getListCategoryPocket };
