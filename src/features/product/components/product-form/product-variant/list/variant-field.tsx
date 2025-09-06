import { Input } from "@/components/ui/input";
import type { VariantType } from "@/features/product/components/product-form/product-schema";
import { NumericFormat } from "react-number-format";

function VariantField({
  field,
  variant,
  onChange,
}: {
  field: keyof VariantType;
  variant: VariantType;
  onChange: (field: keyof VariantType, value: string) => void;
}) {
  if (field === "price") {
    return (
      <NumericFormat
        value={variant.price}
        className="bg-white"
        thousandSeparator
        prefix="đ "
        customInput={Input}
        allowNegative={false}
        placeholder="đ 0"
        inputMode="decimal"
        onValueChange={(v) => onChange(field, v.value)}
      />
    );
  }

  if (field === "discount") {
    return (
      <NumericFormat
        value={variant.discount}
        className="bg-white"
        prefix="% "
        customInput={Input}
        allowNegative={false}
        placeholder="% "
        isAllowed={({ floatValue }) =>
          floatValue == null || (floatValue >= 0 && floatValue <= 100)
        }
        onValueChange={(v) => onChange(field, v.value)}
      />
    );
  }

  if (field === "stock") {
    return (
      <NumericFormat
        value={variant.stock}
        className="bg-white"
        thousandSeparator
        allowNegative={false}
        customInput={Input}
        onValueChange={(v) => onChange(field, v.value)}
      />
    );
  }

  if (field === "sku") {
    return (
      <Input
        type="text"
        className="bg-white"
        value={variant.sku}
        onChange={(e) => onChange(field, e.currentTarget.value)}
      />
    );
  }

  return null;
}

export default VariantField;
