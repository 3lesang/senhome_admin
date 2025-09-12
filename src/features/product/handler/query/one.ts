import type { ProductDataType } from "@/features/product/types";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import { queryOptions } from "@tanstack/react-query";

export const productQueryOptions = (id: string) =>
  queryOptions<ProductDataType>({
    queryKey: [PRODUCT_COLLECTION, id],
    queryFn: () =>
      pocketClient
        .collection(PRODUCT_COLLECTION)
        .getOne(id, { expand: "thumbnail" }),
  });
