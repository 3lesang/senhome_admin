import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { createFileRoute } from "@tanstack/react-router";
import { BellIcon } from "lucide-react";

export const Route = createFileRoute("/(app)/")({
  component: RouteComponent,
});

function RouteComponent() {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <>
        <header className="flex justify-between items-center p-4">
          <h3 className="text-xl">Senhome</h3>
          <Button size="icon" variant="secondary">
            <BellIcon />
          </Button>
        </header>
        <main className="h-[calc(100vh-140px)] overflow-auto scrollbar-hide p-2">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <title>Trang chủ</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <div></div>
    </>
  );
}
