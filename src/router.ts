import { createRouter } from "@tanstack/react-router";
import NProgress from "nprogress";
import { queryClient } from "./queryClient";
import { routeTree } from "./routeTree.gen";
import "nprogress/nprogress.css";

NProgress.configure({
	showSpinner: false,
	trickleSpeed: 100,
});

export default NProgress;

export const router = createRouter({
	routeTree,
	context: { queryClient },
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
});

router.subscribe("onBeforeLoad", () => {
	NProgress.start();
});

router.subscribe("onLoad", () => {
	NProgress.done();
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
