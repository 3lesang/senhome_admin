import { createFileRoute } from "@tanstack/react-router";
import { getFullListCategoryQueryOptions } from "@/handlers/category/query/list";
import { productFilesQueryOptions } from "@/handlers/product/query/media";
import { productQueryOptions } from "@/handlers/product/query/one";
import { productVariantQueryOptions } from "@/handlers/product/query/variant";
import ProductUpdatePage from "@/pages/product/update";

export const Route = createFileRoute("/(app)/product/$id")({
	component: RouteComponent,
	loader(ctx) {
		const id = ctx.params.id;
		ctx.context.queryClient?.ensureQueryData(productVariantQueryOptions(id));
		ctx.context.queryClient?.ensureQueryData(productQueryOptions(id));
		ctx.context.queryClient?.ensureQueryData(productFilesQueryOptions(id));
		ctx.context.queryClient?.ensureQueryData(getFullListCategoryQueryOptions());
	},
});

function RouteComponent() {
	const { id } = Route.useParams();
	return <ProductUpdatePage id={id} />;
}
