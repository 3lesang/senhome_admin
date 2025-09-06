import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductForm from "@/features/product/components/product-form/product-form";
import { type ProductFormType } from "@/features/product/components/product-form/product-schema";
import { productQueryOptions } from "@/features/product/handler/query/getOne";
import { productFilesQueryOptions } from "@/features/product/handler/query/productMedia";
import { productVariantQueryOptions } from "@/features/product/handler/query/productVariant";
import { formatProduct, formatProductVariantData } from "@/lib/format";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

interface ProductUpdatePageProps {
  id: string;
}

function ProductUpdatePage({ id }: ProductUpdatePageProps) {
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

export default ProductUpdatePage;
