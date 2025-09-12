import pocketClient from "@/pocketbase/client";
import { PRODUCT_VARIANT_ATTRIBUTES_COLLECTION } from "@/pocketbase/constants";

async function listVariantAttributeProductPocket(productId: string) {
  const res = await pocketClient
    .collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION)
    .getFullList({
      filter: `variant.product = "${productId}"`,
      expand: "attribute,attribute_value,variant",
      sort: "attribute_value.order",
    });
  return res;
}

export { listVariantAttributeProductPocket };
