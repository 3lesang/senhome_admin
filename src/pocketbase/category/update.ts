import pocketClient from "../client";
import { CATEGORY_COLLECTION } from "../constants";

type UpdateCategoryPayload = {
	id: string;
	name: string;
};

async function updateCategoryPocket(payload: UpdateCategoryPayload) {
	const { id, name } = payload;
	return pocketClient.collection(CATEGORY_COLLECTION).update(id, { name });
}

export { updateCategoryPocket };
