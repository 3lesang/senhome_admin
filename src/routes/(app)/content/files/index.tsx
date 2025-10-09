import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getListFileQueryOptions } from "@/api/file/query/list";
import { FileListPage } from "@/pages/content/file/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(50),
	q: z.string().default(""),
});

export const Route = createFileRoute("/(app)/content/files/")({
	component: FileListPage,
	validateSearch: schema,
	loaderDeps: ({ search: { page, limit, q } }) => ({ page, limit, q }),
	loader({ context, deps }) {
		const { page, limit, q } = deps;
		return context.queryClient?.ensureQueryData(
			getListFileQueryOptions({ page, limit, query: q }),
		);
	},
});
