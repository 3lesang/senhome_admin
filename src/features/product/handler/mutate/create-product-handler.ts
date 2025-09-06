import type { ProductFormType } from "@/features/product/components/product-form/product-schema";
import { createProductPocket } from "@/features/product/pocketbase/create-product-pocket";
import { formatCreateProductPayload } from "./format-create-product";

async function createProductHandler(data: ProductFormType) {
  const payload = formatCreateProductPayload(data);
  const resp = await createProductPocket(payload);
  return resp;
}

export { createProductHandler };
