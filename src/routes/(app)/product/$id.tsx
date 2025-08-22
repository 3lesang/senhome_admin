import ProductForm from "@/components/product-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { pb, PRODUCT_COLLECTION } from "@/lib/pocketbase";
import type { Product } from "@/type";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const productQueryOptions = (id: string) =>
  queryOptions<Product>({
    queryKey: [PRODUCT_COLLECTION, id],
    queryFn: () => pb.collection(PRODUCT_COLLECTION).getOne(id),
  });

export const Route = createFileRoute("/(app)/product/$id")({
  component: RouteComponent,
  beforeLoad(ctx) {
    return ctx.context.queryClient.ensureQueryData(
      productQueryOptions(ctx.params.id)
    );
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(productQueryOptions(id));

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/product">Sản phẩm</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{data?.name}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <ProductForm
        defaultValues={{
          id: "",
          name: data?.name,
          description: data?.description,
          price: "",
          slug: "",
          category: "",
        }}
      />
    </div>
  );
}
