import { ReviewListPage } from "@/pages/review/list";
import { getReviewsByProductQueryOptions } from "@/queries/review";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const schema = z.object({
	page: z.number().default(1),
	limit: z.number().default(10),
	query: z.string().default(""),
});

export const Route = createFileRoute("/(app)/products/$id/reviews/")({
	component: ReviewListPage,
	validateSearch: schema,
	loaderDeps: ({ search }) => search,
	loader: ({ context, deps, params }) => {
		return context.queryClient?.ensureQueryData(
			getReviewsByProductQueryOptions({
				page: deps.page,
				limit: deps.limit,
				productId: Number(params.id),
			}),
		);
	},
});
