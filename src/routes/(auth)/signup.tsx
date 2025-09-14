import { createFileRoute } from "@tanstack/react-router";
import SignupPage from "@/app/auth/pages/signup-page";

export const Route = createFileRoute("/(auth)/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SignupPage />;
}
