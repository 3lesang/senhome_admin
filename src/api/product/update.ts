import { slugify } from "@/lib/utils";
import pocketClient from "@/pocketbase/client";
import {
	COLLECTION_PRODUCT_COLLECTION,
	PRODUCT_COLLECTION,
	PRODUCT_OPTION_COLLECTION,
	PRODUCT_OPTION_VALUE_COLLECTION,
	PRODUCT_VARIANT_COLLECTION,
} from "@/pocketbase/constants";

type UpdateProductPayload = {
	id: string;
	info: { name: string; content?: string };
	file: { id: string; url: string }[];
	seo: { title: string; description: string; slug: string };
	price: { price: number; sale_price: number };
	tags: { name: string }[];
	status: "active" | "draft";
	options: { name: string; values: { name: string }[] }[];
	variants: {
		price: number;
		sale_price: number;
		stock: number;
		sku: string;
		file: { id: string; url: string } | null;
		combos: string;
	}[];
	collections: { id: string; name: string }[];
};

export async function updateProductHander(values: UpdateProductPayload) {
	const options = await pocketClient
		.collection(PRODUCT_OPTION_COLLECTION)
		.getFullList({ filter: `product="${values.id}"` });
	if (options.length) {
		const batch = pocketClient.createBatch();
		for (const option of options) {
			batch.collection(PRODUCT_OPTION_COLLECTION).delete(option.id);
		}
		await batch.send();
	}

	for (const o of values.options) {
		const { id } = await pocketClient
			.collection(PRODUCT_OPTION_COLLECTION)
			.create({ name: o.name, product: values.id });
		const optValueBatch = pocketClient.createBatch();
		for (const v of o.values) {
			optValueBatch
				.collection(PRODUCT_OPTION_VALUE_COLLECTION)
				.create({ name: v.name, option: id });
		}
		await optValueBatch.send();
	}

	const variants = await pocketClient
		.collection(PRODUCT_VARIANT_COLLECTION)
		.getFullList({ filter: `product="${values.id}"` });

	if (variants.length) {
		const batch = pocketClient.createBatch();
		for (const variant of variants) {
			batch.collection(PRODUCT_VARIANT_COLLECTION).delete(variant.id);
		}
		await batch.send();
	}

	if (values.variants.length) {
		const variantBatch = pocketClient.createBatch();
		for (const v of values.variants) {
			const body = {
				product: values.id,
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

	const collections = await pocketClient
		.collection(COLLECTION_PRODUCT_COLLECTION)
		.getFullList({ filter: `product="${values.id}"` });

	if (collections.length) {
		const batch = pocketClient.createBatch();
		for (const collection of collections) {
			batch.collection(COLLECTION_PRODUCT_COLLECTION).delete(collection.id);
		}
		await batch.send();
	}

	if (values.collections.length) {
		const collectionBatch = pocketClient.createBatch();
		for (const c of values.collections) {
			const body = {
				product: values.id,
				collection: c.id,
			};
			collectionBatch.collection(COLLECTION_PRODUCT_COLLECTION).create(body);
		}
		await collectionBatch.send();
	}

	return pocketClient.collection(PRODUCT_COLLECTION).update(values.id, {
		name: values.info.name,
		content: values.info.content ? JSON.parse(values.info.content) : null,
		status: values.status,
		price: values.price.price,
		sale_price: values.price.sale_price,
		slug: values.seo.slug ?? slugify(values.info.name),
		seo: {
			title: values.seo.title,
			description: values.seo.description,
		},
		file: values.file.map((f) => f.id),
		tag: values.tags.map((t) => t.name).join(","),
	});
}
