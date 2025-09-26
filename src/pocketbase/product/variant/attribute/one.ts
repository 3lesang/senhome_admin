import pocketClient from "@/pocketbase/client";
import { PRODUCT_VARIANT_ATTRIBUTES_COLLECTION } from "@/pocketbase/constants";

async function getAttributeByVariantPocket(variantId: string) {
	const res = await pocketClient
		.collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION)
		.getFullList({
			filter: `variant="${variantId}"`,
			expand: "attribute,attribute_value",
		});
	return res;
}

export { getAttributeByVariantPocket };
