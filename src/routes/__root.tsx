import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  notFoundComponent: () => {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold">404</h1>
        <p className="text-gray-500">Không tìm thấy trang</p>
      </div>
    );
  },
  component: () => <Outlet />,
});
