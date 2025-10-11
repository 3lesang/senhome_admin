import z from "zod";
import { pocketClient, STORE_PAGE_COLLECTION } from "@/pocketbase";

const schema = z.object({
	title: z.string().min(1),
	content: z.union([z.string(), z.record(z.string(), z.any()), z.null()]),
	slug: z.string().min(1),
});

type Payload = z.infer<typeof schema>;

export async function createStorePageHandler(values: Payload) {
	return pocketClient.collection(STORE_PAGE_COLLECTION).create({
		title: values.title,
		content: values.content,
		slug: values.slug,
	});
}
