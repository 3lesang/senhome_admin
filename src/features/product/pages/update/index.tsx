import ProductForm from "@/features/product/components/product-form/form";
import { type ProductFormType } from "@/features/product/components/product-form/schema";
import { updateProductHandler } from "@/features/product/handler/mutate/update";
import { productQueryOptions } from "@/features/product/handler/query/getOne";
import { productFilesQueryOptions } from "@/features/product/handler/query/productMedia";
import { productVariantQueryOptions } from "@/features/product/handler/query/productVariant";
import { formatProduct, formatProductVariantData } from "@/lib/format";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import UpdatePageHeader from "./header";

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

  const [defaultProduct, setDefaultProduct] = useState<ProductFormType>(
    formatProduct(data, media, productVariantData)
  );

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ProductFormType) => {
      updateProductHandler(defaultProduct, values, id);
      setDefaultProduct(values);
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
      <UpdatePageHeader data={data} />
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
