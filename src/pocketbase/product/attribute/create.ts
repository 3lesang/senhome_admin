import pocketClient from "@/pocketbase/client";
import { PRODUCT_ATTRIBUTE_COLLECTION } from "@/pocketbase/constants";

export type CreateAttributePayload = {
	name: string;
	product: string;
};

async function createAttributePocket(payload: CreateAttributePayload) {
	const res = await pocketClient
		.collection(PRODUCT_ATTRIBUTE_COLLECTION)
		.create(payload);
	return res;
}

export { createAttributePocket };
