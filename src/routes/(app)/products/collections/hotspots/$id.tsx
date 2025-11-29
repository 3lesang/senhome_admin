import { createFileRoute } from "@tanstack/react-router";
import { HotSpotUpdatePage } from "@/pages/hotspot/update";

export const Route = createFileRoute(
	"/(app)/products/collections/hotspots/$id",
)({
	component: HotSpotUpdatePage,
});
