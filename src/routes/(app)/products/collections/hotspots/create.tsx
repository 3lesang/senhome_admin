import { createFileRoute } from "@tanstack/react-router";
import { HotSpotCreatePage } from "@/pages/hotspot/create";

export const Route = createFileRoute(
	"/(app)/products/collections/hotspots/create",
)({
	component: HotSpotCreatePage,
});
