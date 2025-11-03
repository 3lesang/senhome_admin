import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/analytic/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/analytics/"!</div>;
}
