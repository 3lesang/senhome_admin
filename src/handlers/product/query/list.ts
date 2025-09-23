import { queryOptions } from "@tanstack/react-query";
import { getFullListCategoryPocket } from "@/pocketbase/category/list";
import { PRODUCT_COLLECTION } from "@/pocketbase/constants";
import { getListProductPocket } from "@/pocketbase/product/list";

type GetListQueryOptionType = {
	page: number;
	limit: number;
	query: string;
};

export const getListProductQueryOptions = (queries: GetListQueryOptionType) => {
	const { page = 1, limit = 10, query = "" } = queries;
	return queryOptions({
		queryKey: [PRODUCT_COLLECTION, page, limit, query],
		queryFn: async () => {
			const categories = await getFullListCategoryPocket();
			const categoryMap = categories.reduce(
				(acc, { id, name }) => {
					acc[id] = { id, name };
					return acc;
				},
				{} as Record<string, { id: string; name: string }>,
			);
			const products = await getListProductPocket({
				page,
				limit,
				filter: query,
			});
			return { products, categoryMap };
		},
	});
};
