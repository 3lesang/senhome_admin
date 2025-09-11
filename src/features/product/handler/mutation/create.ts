import type { ProductFormType } from "@/features/product/components/form/schema";
import {
  createProductPocket,
  type CreateProductPayload,
} from "@/pocketbase/product/create";
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

async function createProductHandler(data: ProductFormType) {
  const payload = formatCreateProductPayload(data);
  const resp = await createProductPocket(payload);
  return resp;
}

export { createProductHandler };
