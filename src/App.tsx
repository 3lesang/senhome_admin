import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import "./index.css";
import { scan } from "react-scan";
import { queryClient } from "./queryClient";
import { router } from "./router";

scan({
	enabled: true,
});

export default function App() {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>
	);
}
