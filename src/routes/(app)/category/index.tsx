import { createFileRoute } from "@tanstack/react-router";
import { getListCategoryQueryOptions } from "@/handlers/category/query/list";
import CategoryListPage from "@/pages/category/list";

export const Route = createFileRoute("/(app)/category/")({
	component: RouteComponent,
	loader(ctx) {
		ctx.context.queryClient?.ensureQueryData(
			getListCategoryQueryOptions({ page: 1, limit: 10, query: "" }),
		);
	},
});

function RouteComponent() {
	return <CategoryListPage />;
}
