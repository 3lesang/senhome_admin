import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/customers/rating")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/customers/rating"!</div>;
}
