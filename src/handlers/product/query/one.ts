import { queryOptions } from "@tanstack/react-query";
import pocketClient from "@/pocketbase/client";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import type { ProductDataType } from "@/types/product";

export const productQueryOptions = (id: string) =>
	queryOptions<ProductDataType>({
		queryKey: [PRODUCT_COLLECTION, id],
		queryFn: () =>
			pocketClient
				.collection(PRODUCT_COLLECTION)
				.getOne(id, { expand: "thumbnail" }),
	});
