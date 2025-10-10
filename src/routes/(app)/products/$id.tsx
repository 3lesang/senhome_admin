import { createFileRoute } from "@tanstack/react-router";
import {
	getCollectionsProductQueryOptions,
	getCollectionsQueryOptions,
} from "@/api/collection/list";
import { getOptionsProductQueryOptions } from "@/api/option/list";
import { productQueryOptions } from "@/api/product/one";
import { getVariantsProductQueryOptions } from "@/api/variant/list";
import { ProductUpdatePage } from "@/pages/product/update";

export const Route = createFileRoute("/(app)/products/$id")({
	component: ProductUpdatePage,
	async loader({ context, params }) {
		const id = params.id;
		await context.queryClient?.ensureQueryData(
			getOptionsProductQueryOptions(id),
		);
		await context.queryClient?.ensureQueryData(
			getVariantsProductQueryOptions(id),
		);
		await context.queryClient?.ensureQueryData(
			getCollectionsProductQueryOptions(id),
		);
		await context.queryClient?.ensureQueryData(
			getCollectionsQueryOptions({ page: 1, limit: 10, query: "" }),
		);
		return context.queryClient?.ensureQueryData(productQueryOptions(id));
	},
});
