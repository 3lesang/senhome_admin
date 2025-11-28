import { createFileRoute } from "@tanstack/react-router";
import { AlbumCreatePage } from "@/pages/album/create";

export const Route = createFileRoute(
	"/(app)/products/collections/album/create",
)({
	component: AlbumCreatePage,
});
