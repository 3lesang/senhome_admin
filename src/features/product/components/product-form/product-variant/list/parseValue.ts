import type { VariantType } from "../../product-schema";

const numberFields = new Set<keyof VariantType>(["price", "discount", "stock"]);

export function parseValue<K extends keyof VariantType>(
  field: K,
  value: string
): VariantType[K] {
  return numberFields.has(field)
    ? (Number(value) as VariantType[K])
    : (value as VariantType[K]);
}
