import pocketClient from "@/pocketbase/client";
import { POLICY_COLLECTION } from "@/pocketbase/constants";

export type CreatePolicyPayload = {
	title: string;
	content: any;
};

async function createPolicyPocket(payload: CreatePolicyPayload) {
	return pocketClient.collection(POLICY_COLLECTION).create(payload);
}

export { createPolicyPocket };
