import { useIsMobile } from "@/hooks/use-mobile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/product")({
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <div>
        <h1 className="text-xl p-2">Product</h1>
      </div>
    );
  }
  return (
    <div>
      <p>product</p>
    </div>
  );
}
