import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/content/blog/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/store/articles/"!</div>;
}
