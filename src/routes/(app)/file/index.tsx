import { createFileRoute } from "@tanstack/react-router";

import MediaListPage from "@/pages/file/list";

export const Route = createFileRoute("/(app)/file/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <MediaListPage />;
}
