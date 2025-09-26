import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/discounts/coupons")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/discounts/coupons"!</div>;
}
