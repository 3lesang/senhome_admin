import pocketClient from "@/pocketbase/client";
import { POLICY_COLLECTION } from "@/pocketbase/constants";
import type { PolicyType } from "@/types/store";

async function getListPolicyPocket() {
	return pocketClient.collection<PolicyType>(POLICY_COLLECTION).getFullList();
}

export { getListPolicyPocket };
