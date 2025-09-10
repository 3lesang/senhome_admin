import type { FileType } from "@/features/media/types";
import type {
  ProductFormType,
  ProductVariantDataType,
} from "@/features/product/components/form/schema";
import type { ProductDataType } from "@/features/product/types";

import { convertToFileUrl } from "@/lib/utils";

export const formatProductDataForm = (
  data: ProductDataType,
  media?: FileType[],
  productVariantData?: ProductVariantDataType
): ProductFormType => {
  const thumbnail = {
    id: data?.expand?.thumbnail?.id,
    url: convertToFileUrl(data?.expand?.thumbnail) ?? "",
  };
  return {
    id: data?.id,
    name: data?.name,
    content: JSON.stringify(data?.content),
    price: data?.price?.toString() || "",
    discount: data?.discount > 0 ? (data?.discount * 100)?.toString() : "",
    slug: data?.slug || "",
    category: data?.category || "",
    thumbnail: [thumbnail],
    state: data?.deleted ? "draft" : "publish",
    media,
    variantData: productVariantData,
  };
};
