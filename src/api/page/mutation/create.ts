import type { StorePageFormValuesType } from "@/components/form/store/page";
import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";

export async function createStorePageHandler(values: StorePageFormValuesType) {
	return pocketClient.collection(STORE_PAGE_COLLECTION).create({
		title: values.title,
		content: JSON.stringify(values.content),
		slug: values.slug,
	});
}
