import { getOneVariantFilePocket } from "@/features/media/pocketbase/variant/one";
import { convertToFileUrl } from "@/lib/utils";
import { FILE_GRAPH_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

async function getOneVariantFileQueryOptions(variantId: string) {
  return queryOptions({
    queryKey: [FILE_GRAPH_COLLECTION, variantId],
    queryFn: () => getOneVariantFilePocket(variantId),
    select(data) {
      return {
        id: data.file,
        url: convertToFileUrl(data?.expand?.file),
      };
    },
  });
}

export { getOneVariantFileQueryOptions };
