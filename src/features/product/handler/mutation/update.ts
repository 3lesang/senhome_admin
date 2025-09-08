import type { ProductFormType } from "@/features/product/components/form/schema";
import {
  updateProductPocket,
  type UpdateProductPayload,
} from "@/features/product/pocketbase/update";
import type { UpdateProductDataType } from "@/features/product/types";
import _ from "lodash";

const getValues = (data: ProductFormType): UpdateProductDataType => {
  return {
    name: data.name,
    content: data.content,
    category: data.category,
    slug: data.slug,
    deleted: data.state == "draft" ? new Date() : null,
    price: Number(data.price),
    discount: Number(data.discount) / 100,
    thumbnail: data.thumbnail?.[0]?.id,
  };
};

function updateProductHandler(
  oldData: ProductFormType,
  newData: ProductFormType,
  productId: string
) {
  const defaultValues: UpdateProductDataType = getValues(oldData);
  const updatedValues: UpdateProductDataType = getValues(newData);

  const equal = _.isEqual(defaultValues, updatedValues);
  if (equal) return;

  const payload: UpdateProductPayload = _.transform(
    updatedValues,
    (result, value, key) => {
      const typeKey = key as keyof UpdateProductDataType;
      if (!_.isEqual(value, defaultValues[typeKey])) {
        result[typeKey] = value as any;
      }
    },
    {} as UpdateProductPayload
  );

  if (Object.values(payload).length) {
    return updateProductPocket(productId, payload);
  }
  return;
}

export { updateProductHandler };
