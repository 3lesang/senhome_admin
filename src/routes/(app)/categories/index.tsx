import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListCategoryQueryOptions } from "@/api/category/list";
import { CategoryListPage } from "@/pages/category/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/categories/")({
	component: CategoryListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(
			getListCategoryQueryOptions(deps),
		);
	},
});
