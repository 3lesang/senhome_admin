import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/content/articles/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/store/articles/"!</div>;
}
