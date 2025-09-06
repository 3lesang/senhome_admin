import type {
  AttributeDataListType,
  ProductVariantDataType,
  VariantDataListType,
  VariantType,
} from "@/features/product/components/product-form/product-schema";
import React, { useState } from "react";
import Attributes from "./attributes/attributes";
import { buildVariants, filterRemovedVariants, updateVariant } from "./helper";
import Variant from "./list";

interface ProductVariantSectionProps {
  data?: ProductVariantDataType;
  onChange?: (data?: ProductVariantDataType) => void;
}

function ProductVariantSection({ data, onChange }: ProductVariantSectionProps) {
  const [attributes, setAttributes] = useState<
    AttributeDataListType | undefined
  >(data?.attributes);
  const [variants, setVariants] = useState<VariantDataListType | undefined>(
    data?.variants
  );

  const handleAttributeChange = (attributes: AttributeDataListType) => {
    const variants = buildVariants(attributes, data?.variants);
    setVariants(variants);
    setAttributes(attributes);
    onChange?.({ attributes, variants });
  };

  const handleVariantChange = (variant: VariantType) => {
    const next = updateVariant(variants, variant);
    setVariants(next);
    onChange?.({ variants: next, attributes });
  };

  return (
    <div className="space-y-8">
      <Attributes data={data?.attributes} onChange={handleAttributeChange} />
      <Variant
        data={filterRemovedVariants(variants ?? {})}
        onChange={handleVariantChange}
      />
    </div>
  );
}

export default React.memo(ProductVariantSection);
