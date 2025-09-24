import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/store")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
