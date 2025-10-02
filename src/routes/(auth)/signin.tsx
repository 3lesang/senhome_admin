import { createFileRoute } from "@tanstack/react-router";
import SigninPage from "@/pages/auth/signin";

export const Route = createFileRoute("/(auth)/signin")({
	component: SigninPage,
});
