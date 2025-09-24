import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListCategoryQueryOptions } from "@/handlers/category/query/list";
import CategoryListPage from "@/pages/category/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	q: z.string().default(""),
});

export const Route = createFileRoute("/(app)/categories/")({
	component: CategoryListPage,
	validateSearch: schema,
	loaderDeps: ({ search: { page, limit, q } }) => ({ page, limit, q }),
	loader({ context, deps }) {
		const { page, limit, q } = deps;
		return context.queryClient?.ensureQueryData(
			getListCategoryQueryOptions({ page, limit, query: q }),
		);
	},
});
