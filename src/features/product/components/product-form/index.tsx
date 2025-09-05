import {
  ProductFormSchema,
  type ProductFormType,
} from "@/features/product/components/product-form/schema";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import ProductInfoSection from "./info";
import ProductMediaSection from "./media";
import ProductPriceSection from "./price";
import ProductSidebar from "./sidebar";
import ProductVariantSection from "./variant";

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
                <ProductInfoSection />
              </div>
              <div className="col-span-12">
                <ProductMediaSection />
              </div>
              <div className="col-span-12">
                <ProductPriceSection />
              </div>
              <div className="col-span-12">
                <ProductVariantSection
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
              {isUpdate ? "Cập nhật" : "Lưu"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default ProductForm;
