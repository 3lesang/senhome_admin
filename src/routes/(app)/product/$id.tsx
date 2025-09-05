import ProductForm from "@/components/product-form";
import { type ProductFormType } from "@/components/product-form/schema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatProduct, formatProductVariantData } from "@/lib/format";
import {
  productCategoryQueryOptions,
  productFilesQueryOptions,
  productQueryOptions,
  productVariantQueryOptions,
} from "@/lib/pocketbase";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

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

  const { data: media } = useSuspenseQuery(productFilesQueryOptions(id));
  const { data: variantData } = useSuspenseQuery(
    productVariantQueryOptions(id)
  );
  const { data } = useSuspenseQuery(productQueryOptions(id));

  const productVariantData = formatProductVariantData(variantData);

  const [defaultProduct, _] = useState<ProductFormType>(
    formatProduct(data, media, productVariantData)
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ProductFormType) => {
      console.log(values);
      return;
    },
    onSuccess: () => {
      toast("Cập nhật sản phẩm thành công.");
    },
  });

  const handleSubmit = async (values: ProductFormType) => {
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
              <BreadcrumbItem>{data?.name}</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div></div>
      </div>
      <ProductForm
        onSubmit={handleSubmit}
        isUpdate
        isPending={isPending}
        defaultValues={defaultProduct}
      />
    </div>
  );
}
