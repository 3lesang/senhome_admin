import { createFileRoute } from "@tanstack/react-router";
import CollectionCreatePage from "@/pages/collection/create";

export const Route = createFileRoute("/(app)/products/collections/create")({
	component: CollectionCreatePage,
});
