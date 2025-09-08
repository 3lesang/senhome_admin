import { productCategoryQueryOptions } from "@/features/category/handler/query/productCategory";
import { productQueryOptions } from "@/features/product/handler/query/product";
import { productFilesQueryOptions } from "@/features/product/handler/query/media";
import { productVariantQueryOptions } from "@/features/product/handler/query/variant";
import ProductUpdatePage from "@/features/product/pages/update";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/product/$id")({
  component: RouteComponent,
  beforeLoad(ctx) {
    const id = ctx.params.id;
    ctx.context.queryClient.ensureQueryData(productVariantQueryOptions(id));
    ctx.context.queryClient.ensureQueryData(productQueryOptions(id));
    ctx.context.queryClient.ensureQueryData(productFilesQueryOptions(id));
    ctx.context.queryClient.ensureQueryData(productCategoryQueryOptions());
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <ProductUpdatePage id={id} />;
}
