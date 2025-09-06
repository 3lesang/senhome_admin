import pocketClient from "@/lib/pocketbase";
import { CATEGORY_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

export const productCategoryQueryOptions = () =>
  queryOptions({
    queryKey: [CATEGORY_COLLECTION],
    queryFn: () => pocketClient.collection(CATEGORY_COLLECTION).getFullList({}),
  });
