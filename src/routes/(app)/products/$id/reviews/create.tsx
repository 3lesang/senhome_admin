import { ReviewCreatePage } from "@/pages/review/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/products/$id/reviews/create")({
  component: ReviewCreatePage,
});
