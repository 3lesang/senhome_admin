import { queryOptions } from "@tanstack/react-query";
import { convertToFileUrl } from "@/lib/utils";
import { FILE_GRAPH_COLLECTION } from "@/pocketbase/constants";
import { getOneVariantFilePocket } from "@/pocketbase/file/variant/one";

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
