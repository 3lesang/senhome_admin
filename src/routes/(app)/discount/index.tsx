import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/discount/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/discounts/"!</div>;
}
