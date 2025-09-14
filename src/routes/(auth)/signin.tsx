import { createFileRoute } from "@tanstack/react-router";
import SigninPage from "@/app/auth/pages/signin-page";

export const Route = createFileRoute("/(auth)/signin")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SigninPage />;
}
