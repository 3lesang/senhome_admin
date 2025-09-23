import { createFileRoute } from "@tanstack/react-router";
import SignupPage from "@/pages/auth/signup-page";

export const Route = createFileRoute("/(auth)/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SignupPage />;
}
