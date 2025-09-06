import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { variantData } from "@/data/variantData";
import { batchMediaHandler } from "@/features/media/handler";
import ProductForm from "@/features/product/components/product-form/product-form";
import { type ProductFormType } from "@/features/product/components/product-form/product-schema";
import { createProductHandler } from "@/features/product/handler/mutate/create-product-handler";
import { createVariantHandler } from "@/features/product/handler/mutate/variant/create-variant-handler";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const defaultValues: ProductFormType = {
  name: "",
  price: "",
  discount: "",
  slug: "",
  content: "",
  thumbnail: [],
  category: "",
  state: "draft",
  media: [],
  variantData: variantData,
};

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
        defaultValues={defaultValues}
      />
    </div>
  );
}

export default ProductCreatePage;
