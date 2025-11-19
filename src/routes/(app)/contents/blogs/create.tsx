import { BlogCreatePage } from "@/pages/blog/create";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/contents/blogs/create")({
  component: BlogCreatePage,
});
