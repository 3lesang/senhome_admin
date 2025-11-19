import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/stores")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
