import { createRouter } from "@tanstack/react-router";
import topbar from "topbar";
import { queryClient } from "./queryClient";
import { routeTree } from "./routeTree.gen";

topbar.config({
	barThickness: 2,
});

const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
});

router.subscribe("onBeforeLoad", () => {
	topbar.show();
});

router.subscribe("onLoad", () => {
	topbar.hide();
});

export { router };

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
