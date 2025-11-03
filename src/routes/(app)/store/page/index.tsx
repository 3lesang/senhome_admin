import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getStorePagesQueryOptions } from "@/api/page/list";
import { PageStoreListPage } from "@/pages/page/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/store/page/")({
	component: PageStoreListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(
			getStorePagesQueryOptions(deps),
		)
	},
});
