import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { CollectionListPage } from "@/pages/collection/list";
import { getCollectionsQueryOptions } from "@/queries/collection";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/products/collections/")({
	component: CollectionListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(
			getCollectionsQueryOptions(deps),
		)
	},
});
