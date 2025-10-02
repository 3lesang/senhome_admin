import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListCollectionQueryOptions } from "@/handlers/collection/query/list";
import CollectionListPage from "@/pages/collection/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	q: z.string().default(""),
});

export const Route = createFileRoute("/(app)/products/collections/")({
	component: CollectionListPage,
	validateSearch: schema,
	loaderDeps: ({ search: { page, limit, q } }) => ({ page, limit, q }),
	loader({ context, deps }) {
		const { page, limit, q } = deps;
		return context.queryClient?.ensureQueryData(
			getListCollectionQueryOptions({ page, limit, query: q }),
		);
	},
});
