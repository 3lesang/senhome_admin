import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/customer/rating")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/customers/rating"!</div>;
}
