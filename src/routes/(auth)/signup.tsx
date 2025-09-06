import SignupPage from "@/features/auth/pages/signup-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignupPage />;
}
