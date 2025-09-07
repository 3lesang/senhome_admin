import { variantData } from "@/data/variantData";
import type { ProductFormType } from "@/features/product/components/product-form/schema";

export const defaultValues: ProductFormType = {
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
