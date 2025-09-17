import { createFileRoute } from "@tanstack/react-router";
import { getFullListCategoryQueryOptions } from "@/app/category/handler/query/list";
import { productFilesQueryOptions } from "@/app/product/handler/query/media";
import { productQueryOptions } from "@/app/product/handler/query/one";
import { productVariantQueryOptions } from "@/app/product/handler/query/variant";
import ProductUpdatePage from "@/app/product/pages/update";

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
