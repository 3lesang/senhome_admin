import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListMenuQueryOptions } from "@/api/menu/list";
import { MenuListPage } from "@/pages/menu/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/store/menus/")({
	component: MenuListPage,
	validateSearch: schema,
	loaderDeps: ({ search: { page, limit, query } }) => ({ page, limit, query }),
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(getListMenuQueryOptions(deps));
	},
});
