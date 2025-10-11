import { pocketClient } from "@/pocketbase";

export async function signInHandler(data: { email: string; password: string }) {
	return pocketClient
		.collection("_superusers")
		.authWithPassword(data.email, data.password);
}
