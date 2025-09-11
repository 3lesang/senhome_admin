import pocketClient from "@/pocketbase/client";
import { CATEGORY_COLLECTION } from "@/pocketbase/constants/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const categoryMapHandler = () => {
  return useQuery({
    queryKey: [CATEGORY_COLLECTION],
    queryFn: () => pocketClient.collection(CATEGORY_COLLECTION).getFullList({}),
    select(data) {
      const categoryMap = data.reduce(
        (acc, { id, name }) => {
          acc[id] = { id, name };
          return acc;
        },
        {} as Record<string, { id: string; name: string }>
      );
      return categoryMap;
    },
  });
};
