import ProductForm from "@/features/product/components/product-form";
import { type ProductFormType } from "@/features/product/components/product-form/schema";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { variantData } from "@/data/variantData";
import { createProductHandler } from "@/features/product/handler/create";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/(app)/product/create")({
  component: RouteComponent,
});

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

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: createProductHandler,
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
