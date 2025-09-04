import type { AttributesDataChange } from "@/components/product-form/variant/attributes";
import {
  pb,
  PRODUCT_ATTRIBUTE_COLLECTION,
  PRODUCT_ATTRIBUTE_VALUE_COLLECTION,
  PRODUCT_VARIANT_ATTRIBUTES_COLLECTION,
  PRODUCT_VARIANT_COLLECTION,
} from "@/lib/pocketbase";
import type { VariantDataList } from "@/type";

async function batchVariant(data: {
  attributesChange: AttributesDataChange;
  variantsChange: VariantDataList;
  productId?: string;
}) {
  const addedAttributes = Object.values(data.attributesChange.addedAttributes);
  const variants = Object.values(data.variantsChange);
  const optResult = [];
  for (const attr of addedAttributes) {
    const res = await pb.collection(PRODUCT_ATTRIBUTE_COLLECTION).create({
      name: attr.name,
    });
    const options = Object.values(attr.options);
    for (const opt of options) {
      const optRes = await pb
        .collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION)
        .create({
          name: opt.name,
          attribute: res.id,
        });

      optResult.push({
        attribute: res.id,
        attribute_value: optRes.id,
        id: opt.id,
      });
    }
  }

  for (const vrt of variants) {
    const opts = Object.values(vrt);
    const variant = opts?.[0]?.variant;

    const res = await pb.collection(PRODUCT_VARIANT_COLLECTION).create({
      product: data.productId,
      price: variant.price,
      discount: variant.price,
      stock: variant.stock,
      sku: variant.sku,
    });

    for (const opt of opts) {
      const otpData = optResult.find((o) => o.id == opt.option.id);
      pb.collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION).create({
        variant: res.id,
        attribute: otpData?.attribute,
        attribute_value: otpData?.attribute_value,
      });
    }
  }
}

export { batchVariant };
