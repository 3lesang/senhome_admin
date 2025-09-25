import type { StoreLocationFormValuesType } from "@/components/store-form/location";
import pocketClient from "../client";
import { STORE_COLLECTION } from "../constants";

export type CreateStorePayload = {
	name: string;
	description: string;
	email: string;
	phone: string;
	location: StoreLocationFormValuesType;
};

async function createStorePocket(payload: CreateStorePayload) {
	return pocketClient.collection(STORE_COLLECTION).create(payload);
}

export { createStorePocket };
