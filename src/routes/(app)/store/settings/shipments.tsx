import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/store/settings/shipments")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/store/settings/shipments"!</div>;
}
