import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getStorePagesQueryOptions } from "@/api/page/query/list";
import { PageStoreListPage } from "@/pages/pages/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	q: z.string().default(""),
});

export const Route = createFileRoute("/(app)/store/pages/")({
	component: PageStoreListPage,
	validateSearch: schema,
	loaderDeps: ({ search: { page, limit, q } }) => ({ page, limit, q }),
	loader({ context, deps }) {
		const { page, limit, q } = deps;
		return context.queryClient?.ensureQueryData(
			getStorePagesQueryOptions({ page, limit, query: q }),
		);
	},
});
