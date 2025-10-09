import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/content/blogs/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/store/articles/"!</div>;
}
