import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/discount/promotion")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/discounts/promotions"!</div>;
}
