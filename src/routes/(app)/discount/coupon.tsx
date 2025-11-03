import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/discount/coupon")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/discounts/coupons"!</div>;
}
