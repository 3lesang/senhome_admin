import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import { getReviewsProductQueryOptions } from "@/api/review/list";
import { ListReviewPage } from "@/pages/review/list";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/products/$id/reviews/")({
	component: ListReviewPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader: ({ context, deps, params }) => {
		return context.queryClient?.ensureQueryData(
			getReviewsProductQueryOptions({
				page: deps.page,
				limit: deps.limit,
				productId: params.id,
			}),
		)
	},
});
