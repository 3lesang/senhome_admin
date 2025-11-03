import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { FilesPage } from "@/pages/content/file/list";
import { getFilesQueryOptions } from "@/queries/file";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(50),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/content/file/")({
	component: FilesPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(getFilesQueryOptions(deps));
	},
});
