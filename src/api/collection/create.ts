import z from "zod";
import { slugify } from "@/lib/utils";
import {
	COLLECTION_COLLECTION,
	COLLECTION_PRODUCT_COLLECTION,
	pocketClient,
} from "@/pocketbase";

const schema = z.object({
	name: z.string().min(1, "Name is required"),
	slug: z.string(),
	content: z.union([z.string(), z.record(z.string(), z.any()), z.null()]),
	type: z.enum(["manual", "smart"]),
	file: z.object({ id: z.string(), url: z.string() }).nullable(),
	schedule: z.date().nullable(),
	seo: z.object({
		title: z.string(),
		description: z.string(),
	}),
	conditions: z.string(),
	layout: z.enum(["default", "hero", "home"]),
	products: z.array(
		z.object({ id: z.string(), name: z.string(), thumbnail: z.string() }),
	),
});

type CreateCollectionPayload = z.infer<typeof schema>;

export async function createCollectionHander(values: CreateCollectionPayload) {
	const res = await pocketClient.collection(COLLECTION_COLLECTION).create({
		name: values.name,
		slug: values.slug || slugify(values.name),
		content: values.content,
		type: values.type,
		file: values.file?.id,
		schedule: values.schedule,
		seo: {
			title: values.seo.title,
			description: values.seo.description,
		},
		conditions: values.type === "smart" ? values.conditions : "",
		layout: values.layout,
	});

	if (values.products.length) {
		const batch = pocketClient.createBatch();
		for (const product of values.products) {
			batch.collection(COLLECTION_PRODUCT_COLLECTION).create({
				product: product.id,
				collection: res.id,
			});
		}
		await batch.send();
	}

	return res;
}
