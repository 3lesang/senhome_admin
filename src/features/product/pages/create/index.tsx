import { batchMediaHandler } from "@/features/media/handler";
import ProductForm from "@/features/product/components/product-form/product-form";
import { type ProductFormType } from "@/features/product/components/product-form/schema";
import { createProductHandler } from "@/features/product/handler/mutate/create-product-handler";
import { createVariantHandler } from "@/features/product/handler/mutate/variant/create-variant-handler";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { defaultValues } from "./data";
import CreatePageHeader from "./header";

function ProductCreatePage() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ProductFormType) => {
      const resp = await createProductHandler(values);
      const productId = resp.id;
      const { media = [], variantData = {} } = values;
      await batchMediaHandler([], media, productId);
      await createVariantHandler(variantData, productId);
      return resp;
    },
    onSuccess: (data) => {
      navigate({ to: "/product/$id", params: { id: data.id } });
      toast.success("Thêm sản phẩm thành công");
    },
  });
  const handleSubmit = (values: ProductFormType) => {
    mutate(values);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 p-4">
      <CreatePageHeader />
      <ProductForm
        isPending={isPending}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
}

export default ProductCreatePage;
