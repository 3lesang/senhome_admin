import type { FileType } from "@/features/media/components/schema";
import type {
  ProductFormType,
  ProductVariantDataType,
} from "@/features/product/components/form/schema";
import type { ProductDataType } from "@/features/product/types";

import { convertToFileUrl } from "@/lib/utils";

export const formatProduct = (
  data: ProductDataType,
  media?: FileType[],
  productVariantData?: ProductVariantDataType
): ProductFormType => {
  return {
    id: data?.id,
    name: data?.name,
    content: JSON.stringify(data?.content),
    price: data?.price?.toString() || "",
    discount: data?.discount > 0 ? (data?.discount * 100)?.toString() : "",
    slug: data?.slug || "",
    category: data?.category || "",
    thumbnail: [
      {
        id: data?.expand?.thumbnail?.id,
        url: convertToFileUrl(data?.expand?.thumbnail) ?? "",
      },
    ],
    state: data?.deleted ? "draft" : "publish",
    media,
    variantData: productVariantData,
  };
};
