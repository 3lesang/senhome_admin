import type { FileType } from "@/features/file/types";
import type { ProductVariantDataType } from "@/features/product/components/form/schema";

export type AttributeNormalizeType = {
  id: string;
  name: string;
  status?: "new" | "updated" | "removed" | "unchanged" | undefined;
};

export type OptionNormalizeType = {
  id: string;
  name: string;
  attributeId: string;
  status?: "new" | "updated" | "removed" | "unchanged" | undefined;
};

export type VariantNormalizeType = {
  id: string;
  price: number;
  discount: number;
  stock: number;
  sku: string;
  image?: FileType[];
  optionIds: string[];
  status?: "new" | "updated" | "removed" | "unchanged" | undefined;
};

function normalizeVariantProductFormData(formData: ProductVariantDataType) {
  const attributes: AttributeNormalizeType[] = Object.values(
    formData?.attributes ?? {}
  ).map((attr) => ({
    id: attr.id,
    name: attr.name,
    status: attr.status,
  }));

  const options: OptionNormalizeType[] = Object.values(
    formData?.attributes ?? {}
  ).flatMap((attr) =>
    Object.values(attr.options).map((opt) => ({
      id: opt.id,
      name: opt.name,
      attributeId: attr.id,
      status: opt.status,
    }))
  );

  const variants: VariantNormalizeType[] = Object.values(
    formData?.variants ?? {}
  ).map((v) => {
    const oneVariant = Object.values(v)?.[0]?.variant;
    const result: VariantNormalizeType = {
      id: oneVariant.id,
      price: oneVariant.price,
      discount: oneVariant.discount / 100,
      stock: oneVariant.stock,
      sku: oneVariant.sku,
      status: oneVariant.status,
      image: oneVariant.image,
      optionIds: Object.keys(v),
    };
    return result;
  });

  return { attributes, options, variants };
}

export { normalizeVariantProductFormData };
