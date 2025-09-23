import pocketClient from "@/pocketbase/client";
import { POLICY_COLLECTION } from "@/pocketbase/constants";

export type UpdatePolicyPayload = {
	title: string;
	content: any;
};

async function updatePolicyPocket(id: string, payload: UpdatePolicyPayload) {
	return pocketClient.collection(POLICY_COLLECTION).update(id, payload);
}

export { updatePolicyPocket };
