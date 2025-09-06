import pocketClient from "@/lib/pocketbase";
import { PRODUCT_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

export const countProductQueryOptions = () =>
  queryOptions({
    queryKey: ["COUNT_PRODUCT"],
    queryFn: async () => {
      const all = await pocketClient
        .collection(PRODUCT_COLLECTION)
        .getList(1, 1);
      const publish = await pocketClient
        .collection(PRODUCT_COLLECTION)
        .getList(1, 1, {
          filter: "deleted=null",
        });
      const unpublish = await pocketClient
        .collection(PRODUCT_COLLECTION)
        .getList(1, 1, {
          filter: "deleted!=null",
        });
      return {
        totalAll: all.totalItems,
        totalPublish: publish.totalItems,
        totalUnpublish: unpublish.totalItems,
      };
    },
  });
