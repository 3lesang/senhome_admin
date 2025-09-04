import type { AttributeDataList, VariantData, VariantDataList } from "@/type";
import React, { useState } from "react";
import Attributes, { type AttributesDataChange } from "./attributes";
import { buildAttributes, buildVariants } from "./helper";
import Variant from "./list";

interface ProductVariantSectionData {
  attributes: AttributeDataList;
  variants: VariantDataList;
}

interface ProductVariantSectionProps {
  data?: ProductVariantSectionData;
  onAttributesChange?: (data?: AttributesDataChange) => void;
  onVariantsChange?: (data?: VariantDataList) => void;
}

const ProductVariantSection = ({ data }: ProductVariantSectionProps) => {
  const [variants, setVariants] = useState<VariantDataList>(
    data?.variants ?? {}
  );

  const handleAttributeChange = (values: AttributesDataChange) => {
    console.log(values);
    const attributes = buildAttributes(data?.attributes ?? {}, values);
    const variants = buildVariants(attributes, data?.variants);
    setVariants(variants);
  };

  const handleVariantChange = (data: VariantData[string]["variant"]) => {
    console.log(data);
  };

  return (
    <div className="space-y-8">
      <Attributes
        data={data?.attributes ?? {}}
        onChange={handleAttributeChange}
      />
      <Variant data={variants} onChange={handleVariantChange} />
    </div>
  );
};

export default React.memo(ProductVariantSection);
