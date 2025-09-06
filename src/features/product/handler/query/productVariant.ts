import pocketClient from "@/lib/pocketbase";
import { PRODUCT_VARIANT_ATTRIBUTES_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

export const productVariantQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: [PRODUCT_VARIANT_ATTRIBUTES_COLLECTION, productId],
    queryFn: async () => {
      const res = await pocketClient
        .collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION)
        .getFullList({
          filter: `variant.product = "${productId}"`,
          expand: "attribute,attribute_value,variant",
          sort: "attribute_value.order",
        });

      return res;
    },
  });
