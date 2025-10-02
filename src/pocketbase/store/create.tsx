import pocketClient from "../client";
import { STORE_COLLECTION } from "../constants";

type LocationType = {
	street: string;
	ward: { id: string; name: string };
	district: { id: string; name: string };
	province: { id: string; name: string };
};

export type CreateStorePayload = {
	name: string;
	description: string;
	email: string;
	phone: string;
	location: LocationType;
};

async function createStorePocket(payload: CreateStorePayload) {
	return pocketClient.collection(STORE_COLLECTION).create(payload);
}

export { createStorePocket };
