import { queryOptions } from "@tanstack/react-query";
import type { ProductDataType } from "@/app/product/types";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";

export const productQueryOptions = (id: string) =>
	queryOptions<ProductDataType>({
		queryKey: [PRODUCT_COLLECTION, id],
		queryFn: () =>
			pocketClient
				.collection(PRODUCT_COLLECTION)
				.getOne(id, { expand: "thumbnail" }),
	});
