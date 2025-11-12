import { ReviewCreatePage } from "@/pages/review/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/product/$id/review/create")({
  component: ReviewCreatePage,
});
