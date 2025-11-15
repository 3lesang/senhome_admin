import { BlogUpdatePage } from "@/pages/blog/update";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/content/blog/$id")({
  component: BlogUpdatePage,
});
