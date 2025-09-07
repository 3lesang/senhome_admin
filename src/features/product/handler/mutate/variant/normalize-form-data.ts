import type { ProductVariantDataType } from "@/features/product/components/product-form/schema";

function normalizeVariantProductFormData(formData: ProductVariantDataType) {
  const attributes = Object.values(formData?.attributes ?? {}).map((attr) => ({
    id: attr.id,
    name: attr.name,
    status: attr.status,
  }));

  const options = Object.values(formData?.attributes ?? {}).flatMap((attr) =>
    Object.values(attr.options).map((opt) => ({
      id: opt.id,
      name: opt.name,
      attributeId: attr.id,
      status: opt.status,
    }))
  );

  const variants = Object.values(formData?.variants ?? {}).map((v) => {
    const oneVariant = Object.values(v)?.[0]?.variant;
    return {
      id: oneVariant.id,
      price: oneVariant.price,
      discount: oneVariant.discount,
      stock: oneVariant.stock,
      sku: oneVariant.sku,
      status: oneVariant.status,
      image: oneVariant.image,
      optionIds: Object.keys(v),
    };
  });

  return { attributes, options, variants };
}

export { normalizeVariantProductFormData };
