import z from "zod";
import { slugify } from "@/lib/utils";
import {
	COLLECTION_PRODUCT_COLLECTION,
	PRODUCT_COLLECTION,
	PRODUCT_OPTION_COLLECTION,
	PRODUCT_OPTION_VALUE_COLLECTION,
	PRODUCT_VARIANT_COLLECTION,
	pocketClient,
} from "@/pocketbase";

const schema = z.object({
	id: z.string(),
	name: z.string(),
	content: z.union([z.string(), z.record(z.string(), z.any()), z.null()]),
	file: z.array(z.object({ id: z.string(), url: z.string() })),
	price: z.number(),
	sale_price: z.number(),
	slug: z.string(),
	seo: z.object({
		title: z.string(),
		description: z.string(),
	}),
	status: z.enum(["active", "draft"]),
	tag: z.string(),
	options: z.array(
		z.object({
			id: z.string(),
			name: z.string().min(1, "Name is required"),
			values: z.array(
				z.object({
					id: z.string(),
					name: z.string().min(1, "Value name is required"),
				}),
			),
		}),
	),
	variants: z.array(
		z.object({
			id: z.string(),
			price: z.number(),
			sale_price: z.number(),
			stock: z.number(),
			sku: z.string(),
			combos: z.string(),
			file: z.object({ id: z.string(), url: z.string() }).nullable(),
		}),
	),
	collections: z.array(z.object({ id: z.string(), name: z.string() })),
	category: z.string(),
});

type CreateProductPayload = z.infer<typeof schema>;

export async function createProductHandler(values: CreateProductPayload) {
	const body = {
		name: values.name,
		content: values.content,
		status: values.status,
		price: values.price,
		sale_price: values.sale_price,
		slug: values.slug ?? slugify(values.name),
		seo: {
			title: values.seo.title,
			description: values.seo.description,
		},
		thumbnail: values.file?.[0]?.id,
		file: values.file?.map((f) => f?.id),
		tag: values.tag,
		category: values.category,
	};

	const res = await pocketClient.collection(PRODUCT_COLLECTION).create(body);

	if (values.options.length) {
		for (const o of values.options) {
			const { id } = await pocketClient
				.collection(PRODUCT_OPTION_COLLECTION)
				.create({ name: o.name, product: res.id });
			const optValueBatch = pocketClient.createBatch();
			for (const v of o.values) {
				optValueBatch
					.collection(PRODUCT_OPTION_VALUE_COLLECTION)
					.create({ name: v.name, option: id });
			}
			await optValueBatch.send();
		}
	}

	if (values.variants.length) {
		const variantBatch = pocketClient.createBatch();
		for (const v of values.variants) {
			const body = {
				product: res.id,
				price: v.price,
				sale_price: v.sale_price,
				file: v.file?.id,
				combos: v.combos,
				stock: v.stock,
				sku: v.sku,
			};
			variantBatch.collection(PRODUCT_VARIANT_COLLECTION).create(body);
		}
		await variantBatch.send();
	}

	if (values.collections.length) {
		const collectionBatch = pocketClient.createBatch();
		for (const c of values.collections) {
			const body = {
				product: res.id,
				collection: c.id,
			};
			collectionBatch.collection(COLLECTION_PRODUCT_COLLECTION).create(body);
		}
		await collectionBatch.send();
	}

	return res;
}
