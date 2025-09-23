import { createFileRoute } from "@tanstack/react-router";
import { getListProductQueryOptions } from "@/handlers/product/query/list";
import ProductListPage from "@/pages/product/list";

export const Route = createFileRoute("/(app)/product/")({
	component: RouteComponent,
	loader(ctx) {
		ctx.context.queryClient?.ensureQueryData(
			getListProductQueryOptions({ page: 1, limit: 10, query: "" }),
		);
	},
});

function RouteComponent() {
	return <ProductListPage />;
}
