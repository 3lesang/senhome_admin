import { ProductUpdatePage } from "@/pages/product/update";
import {
  getProductContentQueryOptions,
  getProductQueryOptions,
} from "@/queries/product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/products/$id/update")({
  component: ProductUpdatePage,
  async loader({ context, params }) {
    const id = params.id;
    const product = await context.queryClient?.ensureQueryData(
      getProductQueryOptions(id),
    );
    await context.queryClient?.ensureQueryData(
      getProductContentQueryOptions(product?.data.slug ?? ""),
    );
  },
});
