import type { SigninFormValuesType } from "@/components/form/signin";
import pocketClient from "@/pocketbase/client";

async function signInHandler(data: SigninFormValuesType) {
	return pocketClient
		.collection("_superusers")
		.authWithPassword(data.email, data.password);
}

export default signInHandler;
