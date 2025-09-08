import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  ProductFormSchema,
  type ProductFormType,
} from "@/features/product/components/product-form/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import ProductInfo from "./info";
import ProductMedia from "./media";
import ProductPrice from "./price";
import ProductSidebar from "./sidebar";
import ProductVariant from "./variant";

interface ProductProps {
  isPending?: boolean;
  isUpdate?: boolean;
  defaultValues?: ProductFormType;
  onSubmit?: (values: ProductFormType) => void;
}

function ProductForm({
  isUpdate,
  isPending,
  defaultValues,
  onSubmit,
}: ProductProps) {
  const form = useForm<ProductFormType>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit ?? (() => {}))}>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12">
                <ProductInfo />
              </div>
              <div className="col-span-12">
                <ProductMedia />
              </div>
              <div className="col-span-12">
                <ProductPrice />
              </div>
              <div className="col-span-12">
                <ProductVariant
                  data={form.getValues("variantData")}
                  onChange={(data) => form.setValue("variantData", data)}
                />
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <ProductSidebar />
          </div>
          <div className="col-span-12 text-right">
            <Button type="submit" disabled={isPending}>
              {isPending && <LoaderCircleIcon className="animate-spin" />}
              {isUpdate ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
