import { createFileRoute } from "@tanstack/react-router";

import MediaListPage from "@/features/media/pages/list";

export const Route = createFileRoute("/(app)/file/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MediaListPage />;
}
