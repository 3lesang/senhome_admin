import { createFileRoute } from "@tanstack/react-router";
import { getFullListCategoryQueryOptions } from "@/handlers/category/query/list";
import { productFilesQueryOptions } from "@/handlers/product/query/media";
import { productQueryOptions } from "@/handlers/product/query/one";
import { productVariantQueryOptions } from "@/handlers/product/query/variant";
import ProductUpdatePage from "@/pages/product/update";

export const Route = createFileRoute("/(app)/products/$id")({
	component: ProductUpdatePage,
	async loader({ context, params }) {
		const id = params.id;
		await context.queryClient?.ensureQueryData(productVariantQueryOptions(id));
		await context.queryClient?.ensureQueryData(productQueryOptions(id));
		await context.queryClient?.ensureQueryData(productFilesQueryOptions(id));
		return await context.queryClient?.ensureQueryData(
			getFullListCategoryQueryOptions(),
		);
	},
});
