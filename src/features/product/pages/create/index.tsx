import { batchProductMediaHandler } from "@/features/media/handler/mutation/product";
import ProductForm from "@/features/product/components/form/form";
import { type ProductFormType } from "@/features/product/components/form/schema";
import { createProductHandler } from "@/features/product/handler/mutation/create";
import { batchVariantHandler } from "@/features/product/handler/mutation/batch-variant";
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
      const { media = [], variantData = {} } = values;
      if (resp?.id) {
        const productId = resp.id;
        await batchProductMediaHandler([], media, productId);
        await batchVariantHandler(variantData, productId);
        return productId;
      }

      return null;
    },
    onSuccess: (id) => {
      if (id) {
        navigate({ to: "/product/$id", params: { id } });
        toast.success("Thêm sản phẩm thành công");
      }
    },
    onError: () => {
      toast.error("Không thể tạo sản phẩm");
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
