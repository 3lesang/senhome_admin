import {
  createProductPocket,
  type CreateProductPayload,
} from "@/features/product/pocketbase/create";
import type { ProductFormType } from "@/features/product/components/product-form/schema";
import { batchMediaHandler } from "@/features/media/handler";
import { slugify } from "@/lib/utils";
import { createVariantHandler } from "./variant";

function formatPayload(data: ProductFormType): CreateProductPayload {
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
  const { media = [], variantData = {} } = data;
  const payload = formatPayload(data);
  const resp = await createProductPocket(payload);
  const productId = resp.id;
  batchMediaHandler([], media, productId);
  createVariantHandler(variantData, productId);
  return resp;
}

export { createProductHandler };
