import pocketClient from "@/pocketbase/client";
import type { CollectionType } from "@/types/collection";
import { COLLECTION_COLLECTION } from "../constants";

async function getOneCollectionPocket(id: string) {
	return pocketClient
		.collection<CollectionType>(COLLECTION_COLLECTION)
		.getOne(id);
}

export { getOneCollectionPocket };
