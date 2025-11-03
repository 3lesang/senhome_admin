import { createFileRoute } from "@tanstack/react-router";
import { CreateReviewPage } from "@/pages/review/create";

export const Route = createFileRoute("/(app)/product/$id/review/create")({
	component: CreateReviewPage,
});
