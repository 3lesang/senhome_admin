import { batchProductMediaHandler } from "@/features/file/handler/mutation/product";
import ProductForm from "@/features/product/components/form/form";
import type { ProductFormType } from "@/features/product/components/form/schema";
import { batchVariantHandler } from "@/features/product/handler/mutation/batch-variant";
import { updateProductHandler } from "@/features/product/handler/mutation/update";
import { productFilesQueryOptions } from "@/features/product/handler/query/media";
import { productQueryOptions } from "@/features/product/handler/query/one";
import { productVariantQueryOptions } from "@/features/product/handler/query/variant";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatProductDataForm } from "./format";
import UpdatePageHeader from "./header";

interface ProductUpdatePageProps {
  id: string;
}

function ProductUpdatePage({ id }: ProductUpdatePageProps) {
  const { data: media, refetch: refetchMedia } = useSuspenseQuery(
    productFilesQueryOptions(id)
  );
  const { data: variantData } = useSuspenseQuery(
    productVariantQueryOptions(id)
  );
  const { data, refetch: refetchProduct } = useSuspenseQuery(
    productQueryOptions(id)
  );
  const defaultProduct = formatProductDataForm(data, media, variantData);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ProductFormType) => {
      updateProductHandler(defaultProduct, values, id);
      await batchProductMediaHandler(
        defaultProduct.media ?? [],
        values.media ?? [],
        id
      );
      await batchVariantHandler(values.variantData ?? {}, id);
      return;
    },
    onSuccess: () => {
      refetchProduct();
      refetchMedia();
      toast("Cập nhật sản phẩm thành công.");
    },
  });

  const handleSubmit = async (values: ProductFormType) => {
    mutate(values);
  };

  return (
    <div>
      <UpdatePageHeader data={data} />
      <div className="max-w-7xl mx-auto pb-8">
        <ProductForm
          onSubmit={handleSubmit}
          isUpdate
          isPending={isPending}
          defaultValues={defaultProduct}
        />
      </div>
    </div>
  );
}

export default ProductUpdatePage;
