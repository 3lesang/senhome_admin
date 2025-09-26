import pocketClient from "@/pocketbase/client";

type SignInRootPayload = {
	identify: string;
	password: string;
};

async function signInRootPocket(payload: SignInRootPayload) {
	const { identify, password } = payload;
	return pocketClient
		.collection("_superusers")
		.authWithPassword(identify, password);
}
export { signInRootPocket };
