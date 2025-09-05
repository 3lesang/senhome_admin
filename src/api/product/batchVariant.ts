import type { ProductVariantDataType } from "@/components/product-form/schema";

async function batchVariant(data: {
  productVariants: ProductVariantDataType;
  productId?: string;
}) {
  console.log(data);
}

export { batchVariant };
