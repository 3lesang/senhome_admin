import type {
  AttributeType,
  ProductVariantDataType,
  VariantDataType,
} from "@/features/product/components/form/schema";
import pocketClient from "@/lib/pocketbase";
import { PRODUCT_VARIANT_ATTRIBUTES_COLLECTION } from "@/shared/constants/pocketbase";
import { queryOptions } from "@tanstack/react-query";

const formatProductVariantData = (data: any[]): ProductVariantDataType => {
  const attributeMap = new Map<string, AttributeType>();
  const variantGroups = new Map<string, VariantDataType>();

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
        options: {},
      });
    }
    const pa = attributeMap.get(attr.id)!;

    pa.options[attrValue.id] = {
      id: attrValue.id,
      name: attrValue.name,
    };

    // 🔹 Group rows by variant.id
    if (!variantGroups.has(variant.id)) {
      variantGroups.set(variant.id, {});
    }

    variantGroups.get(variant.id)![attrValue.id] = {
      option: {
        id: attrValue.id,
        name: attrValue.name,
      },
      variant: {
        id: variant.id,
        price: variant.price,
        discount: variant.discount,
        stock: variant.stock,
        sku: variant.sku,
      },
    };
  });

  return {
    attributes: Object.fromEntries(attributeMap),
    variants: Object.fromEntries(variantGroups),
  };
};

export const productVariantQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: [PRODUCT_VARIANT_ATTRIBUTES_COLLECTION, productId],
    queryFn: async () => {
      const res = await pocketClient
        .collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION)
        .getFullList({
          filter: `variant.product = "${productId}"`,
          expand: "attribute,attribute_value,variant",
          sort: "attribute_value.order",
        });

      return res;
    },
    select(data) {
      const formatted = formatProductVariantData(data);
      return formatted;
    },
  });
