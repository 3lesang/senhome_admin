import type { ProductFormType } from "@/features/product/components/product-form/schema";
import { createProductPocket } from "@/features/product/pocketbase/create";
import { formatCreateProductPayload } from "./format";

async function createProductHandler(data: ProductFormType) {
  const payload = formatCreateProductPayload(data);
  const resp = await createProductPocket(payload);
  return resp;
}

export { createProductHandler };
