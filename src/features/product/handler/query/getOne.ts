import pocketClient from "@/lib/pocketbase";
import { PRODUCT_COLLECTION } from "@/shared/constants/pocketbase";
import type { ProductDataType } from "@/shared/types";
import { queryOptions } from "@tanstack/react-query";

export const productQueryOptions = (id: string) =>
  queryOptions<ProductDataType>({
    queryKey: [PRODUCT_COLLECTION, id],
    queryFn: () =>
      pocketClient
        .collection(PRODUCT_COLLECTION)
        .getOne(id, { expand: "thumbnail" }),
  });
