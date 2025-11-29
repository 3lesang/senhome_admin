import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { HotSpotListPage } from "@/pages/hotspot/list";
import { getHotspotsQueryOptions } from "@/queries/hotspot";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/products/collections/hotspots/")({
	component: HotSpotListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(getHotspotsQueryOptions(deps));
	},
});
