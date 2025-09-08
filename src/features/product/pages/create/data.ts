import type { ProductFormType } from "@/features/product/components/form/schema";

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
  variantData: {},
};
