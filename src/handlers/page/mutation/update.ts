import type { StorePageFormValuesType } from "@/components/form/store/page";
import pocketClient from "@/pocketbase/client";
import { STORE_PAGE_COLLECTION } from "@/pocketbase/constants";

export async function updateStorePageHandler({
	id,
	values,
}: {
	id: string;
	values: StorePageFormValuesType;
}) {
	return pocketClient.collection(STORE_PAGE_COLLECTION).update(id, {
		title: values.title,
		content: values.content,
		slug: values.slug,
	});
}
