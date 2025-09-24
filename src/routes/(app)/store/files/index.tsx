import { createFileRoute } from "@tanstack/react-router";
import FileListPage from "@/pages/file/list";

export const Route = createFileRoute("/(app)/store/files/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <FileListPage />;
}
