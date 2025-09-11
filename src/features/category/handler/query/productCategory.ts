import pocketClient from "@/pocketbase/client";
import { CATEGORY_COLLECTION } from "@/pocketbase/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

export const productCategoryQueryOptions = () =>
  queryOptions({
    queryKey: [CATEGORY_COLLECTION],
    queryFn: () => pocketClient.collection(CATEGORY_COLLECTION).getFullList({}),
  });
