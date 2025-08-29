import type { FileType } from "@/components/media/schema";
import type {
  ProductAttributeFormType,
  ProductFormType,
  ProductVariantFormType,
} from "@/components/product-form/schema";
import { convertToFileUrl } from "@/lib/utils";
import type { ProductDataType, UpdateProductDataType } from "@/type";

export const formatProductVariantData = (
  data: any[]
): {
  attributes: ProductAttributeFormType[];
  variants: Record<string, ProductVariantFormType>;
} => {
  const attributeMap = new Map<string, ProductAttributeFormType>();
  const variantGroups = new Map<string, any[]>();

  data.forEach((record) => {
    const attr = record.expand?.attribute;
    const attrValue = record.expand?.attribute_value;
    const variant = record.expand?.variant;
    if (!attr || !attrValue || !variant) return;

    // 🔹 Build attributes
    if (!attributeMap.has(attr.id)) {
      attributeMap.set(attr.id, {
        id: attr.id,
        name: attr.name,
        options: [],
      });
    }
    const pa = attributeMap.get(attr.id)!;
    if (!pa.options?.some((o) => o.id === attrValue.id)) {
      pa.options?.push({
        id: attrValue.id,
        name: attrValue.name,
      });
    }

    // 🔹 Group rows by variant.id
    if (!variantGroups.has(variant.id)) {
      variantGroups.set(variant.id, []);
    }
    variantGroups.get(variant.id)!.push({
      attrValue,
      variant,
    });
  });

  // 🔹 Build variant map
  const variantMap: Record<string, ProductVariantFormType> = {};
  for (const [id, rows] of variantGroups) {
    const key = rows.map((r) => r.attrValue.id).join("|");

    const variant = rows[0].variant;
    variantMap[key] = {
      id: id,
      price: variant.price?.toString() ?? "",
      stock: variant.stock?.toString() ?? "",
      discount: variant.discount?.toString() ?? "",
      sku: variant.sku ?? "",
    };
  }

  return {
    attributes: Array.from(attributeMap.values()),
    variants: variantMap,
  };
};

export const formatPayloadProduct = (
  formData: ProductFormType
): UpdateProductDataType => {
  return {
    content: JSON.parse(formData?.content || ""),
    price: Number(formData?.price),
    discount: Number(formData?.discount) / 100,
    slug: formData?.slug,
    thumbnail: formData?.thumbnail?.[0]?.id,
    deleted: formData?.state === "draft" ? new Date() : null,
    category: formData?.category,
  };
};

export const formatProduct = (
  data: ProductDataType,
  media?: FileType[],
  variants?: Record<string, ProductVariantFormType>,
  attributes?: ProductAttributeFormType[]
): ProductFormType => {
  return {
    id: data?.id,
    name: data?.name,
    content: JSON.stringify(data?.content),
    price: data?.price?.toString() || "",
    discount: data?.discount > 0 ? (data?.discount * 100)?.toString() : "",
    slug: data?.slug || "",
    category: data?.category || "",
    thumbnail: [
      {
        id: data?.expand?.thumbnail?.id,
        url: convertToFileUrl(data?.expand?.thumbnail) ?? "",
      },
    ],
    state: data?.deleted ? "draft" : "published",
    media,
    variants,
    attributes,
  };
};

export const formatToMedia = (files?: any): FileType[] => {
  return files?.map((item: any) => ({
    record: item.id,
    id: item?.expand?.file.id,
    url: convertToFileUrl(item?.expand?.file) ?? "",
  }));
};
