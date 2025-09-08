import type { ProductFormType } from "@/features/product/components/product-form/schema";
import type { CreateProductPayload } from "@/features/product/pocketbase/create";
import { slugify } from "@/lib/utils";

function formatCreateProductPayload(
  data: ProductFormType
): CreateProductPayload {
  const { name, price, discount, content, category, thumbnail, state } = data;
  const payload: CreateProductPayload = {
    name: name,
    price: Number(price),
    discount: Number(discount) / 100,
    slug: slugify(name ?? ""),
    content: content ? JSON.parse(content) : {},
    category: category,
    thumbnail: thumbnail?.[0]?.id,
    deleted: state == "draft" ? new Date() : null,
  };
  return payload;
}

export { formatCreateProductPayload };
