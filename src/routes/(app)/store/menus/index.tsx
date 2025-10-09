import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListMenuQueryOptions } from "@/api/menu/query/list";
import { MenuListPage } from "@/pages/menu/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	q: z.string().default(""),
});

export const Route = createFileRoute("/(app)/store/menus/")({
	component: MenuListPage,
	validateSearch: schema,
	loaderDeps: ({ search: { page, limit, q } }) => ({ page, limit, q }),
	loader({ context, deps }) {
		const { page, limit, q } = deps;
		return context.queryClient?.ensureQueryData(
			getListMenuQueryOptions({ page, limit, query: q }),
		);
	},
});
