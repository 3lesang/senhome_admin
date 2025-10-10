import z from "zod";
import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";

const schema = z.object({
	id: z.string(),
	title: z.string().min(1),
	content: z.union([z.string(), z.record(z.string(), z.any()), z.null()]),
	slug: z.string().min(1),
});

type Payload = z.infer<typeof schema>;

export async function updateStorePageHandler(values: Payload) {
	return pocketClient.collection(STORE_PAGE_COLLECTION).update(values.id, {
		title: values.title,
		content: values.content,
		slug: values.slug,
	});
}
