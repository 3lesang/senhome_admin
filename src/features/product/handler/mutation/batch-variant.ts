import type { ProductVariantDataType } from "@/features/product/components/form/schema";
import { createAttributeHandler } from "@/features/product/handler/mutation/attribute/create";
import { normalizeVariantProductFormData } from "@/features/product/handler/mutation/normalize";
import { createOptionHandler } from "@/features/product/handler/mutation/option/create";
import { deleteAttributeHandler } from "./attribute/delete";
import { updateAttributeHandler } from "./attribute/update";
import { deleteOptionHandler } from "./option/delete";
import { updateOptionHandler } from "./option/update";
import { createVariantHandler } from "./variant/create";
import { deleteVariantHandler } from "./variant/delete";
import { updateVariantHandler } from "./variant/update";

async function batchVariantHandler(
  data: ProductVariantDataType,
  productId: string
) {
  const { attributes, options, variants } =
    normalizeVariantProductFormData(data);

  const addedAttributes = attributes.filter((attr) => attr.status == "new");
  const addedOptions = options.filter((opt) => opt.status == "new");
  const addedVariants = variants.filter((v) => v.status == "new");

  const updatedAttributes = attributes.filter(
    (attr) => attr.status == "updated"
  );
  const updatedOptions = options.filter((opt) => opt.status == "updated");
  const updatedVariants = variants.filter((v) => v.status == "updated");

  const deletedAttributeIds = attributes
    .filter((attr) => attr.status == "removed")
    .map((a) => a.id);
  const deletedOptionIds = options
    .filter((opt) => opt.status == "removed")
    .map((o) => o.id);
  const deletedVariantIds = variants
    .filter((v) => v.status == "removed")
    .map((v) => v.id);

  updateAttributeHandler(updatedAttributes);
  updateOptionHandler(updatedOptions);
  updateVariantHandler(updatedVariants);

  deleteAttributeHandler(deletedAttributeIds);
  deleteOptionHandler(deletedOptionIds);
  deleteVariantHandler(deletedVariantIds);

  const attributeIdMap = await createAttributeHandler(
    addedAttributes,
    productId
  );

  const { optionIdMap, attributeOptionIdMap } = await createOptionHandler(
    addedOptions,
    attributeIdMap
  );

  await createVariantHandler(
    addedVariants,
    optionIdMap,
    attributeIdMap,
    attributeOptionIdMap,
    productId
  );
}

export { batchVariantHandler };
