import {
  updateProductPocket,
  type UpdateProductPayload,
} from "@/features/product/pocketbase/update";
import type { UpdateProductDataType } from "@/shared/types";
import _ from "lodash";

function updateProductHandler(
  defaultValues: UpdateProductDataType,
  updatedValues: UpdateProductDataType,
  productId: string
) {
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

  return updateProductPocket(productId, payload);
}

export { updateProductHandler };
