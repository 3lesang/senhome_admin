import { createFileRoute } from "@tanstack/react-router";
import { CreateReviewPage } from "@/pages/review/create";

export const Route = createFileRoute("/(app)/products/$id/reviews/create")({
	component: CreateReviewPage,
});
