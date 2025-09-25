import { createFileRoute } from "@tanstack/react-router";
import { getStoreQueryOptions } from "@/handlers/store/query/one";
import StoreSettings from "@/pages/store/settings";

export const Route = createFileRoute("/(app)/store/settings")({
	component: StoreSettings,
	loader({ context }) {
		return context.queryClient?.ensureQueryData(getStoreQueryOptions());
	},
});
