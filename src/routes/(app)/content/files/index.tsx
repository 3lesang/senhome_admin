import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListFileQueryOptions } from "@/api/file/list";
import { FileListPage } from "@/pages/content/file/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(50),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/content/files/")({
	component: FileListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader({ context, deps }) {
		return context.queryClient?.ensureQueryData(getListFileQueryOptions(deps));
	},
});
