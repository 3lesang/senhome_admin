import type { StoreLocationFormValuesType } from "@/components/store-form/location";
import pocketClient from "../client";
import { STORE_COLLECTION } from "../constants";

export type UpdateStorePayload = {
	name: string;
	description: string;
	email: string;
	phone: string;
	location: StoreLocationFormValuesType;
};

async function updateStorePocket(id: string, payload: UpdateStorePayload) {
	return pocketClient.collection(STORE_COLLECTION).update(id, payload);
}

export { updateStorePocket };
