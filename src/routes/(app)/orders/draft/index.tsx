import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/orders/draft/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/orders/draft/"!</div>;
}
