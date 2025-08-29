import ProductForm from "@/components/product-form";
import { type ProductFormType } from "@/components/product-form/schema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { pb, PRODUCT_COLLECTION } from "@/lib/pocketbase";
import { slugify } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/product/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ProductFormType) => {
      const payload = {
        name: values?.name,
        price: Number(values?.price),
        discount: Number(values?.discount) / 100,
        slug: slugify(values?.name || ""),
        content: JSON.parse(values?.content || ""),
        category: values?.category,
        thumbnail: values?.thumbnail?.[0]?.id,
      };
      return pb.collection(PRODUCT_COLLECTION).create(payload);
    },
  });
  const handleSubmit = (values: ProductFormType) => {
    mutate(values);
  };
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
              <BreadcrumbItem>Thêm sản phẩm</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <ProductForm
        isPending={isPending}
        onSubmit={handleSubmit}
        defaultValues={{
          state: "draft",
        }}
      />
    </div>
  );
}
