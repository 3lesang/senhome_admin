import { pb, PRODUCT_COLLECTION } from "@/lib/pocketbase";
import type { UpdateProductDataType } from "@/type";
import _ from "lodash";

async function updateProduct(
  defaultValues: UpdateProductDataType,
  updatedValues: UpdateProductDataType,
  productId: string
) {
  const equal = _.isEqual(defaultValues, updatedValues);
  if (equal) return;

  const payload: Partial<UpdateProductDataType> = _.transform(
    updatedValues,
    (result, value, key) => {
      const typeKey = key as keyof UpdateProductDataType;
      if (!_.isEqual(value, defaultValues[typeKey])) {
        result[typeKey] = value as any;
      }
    },
    {} as Partial<UpdateProductDataType>
  );
  return pb.collection(PRODUCT_COLLECTION).update(productId, payload);
}

export { updateProduct };
