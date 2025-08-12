import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="font-bold">404</h1>
          <p className="text-gray-500">Không tìm thấy trang</p>
        </div>
      </div>
    );
  },
  component: () => <Outlet />,
});
