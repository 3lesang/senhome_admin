import { createFileRoute } from "@tanstack/react-router";
import { getFullListCategoryQueryOptions } from "@/handlers/category/query/list";
import { ProductCreatePage } from "@/pages/product/create";

export const Route = createFileRoute("/(app)/products/create")({
	component: ProductCreatePage,
	loader: ({ context }) => {
		return context.queryClient?.ensureQueryData(
			getFullListCategoryQueryOptions(),
		);
	},
});
