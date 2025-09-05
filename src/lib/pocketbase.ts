import type { ProductDataType } from "@/shared/types";
import { queryOptions } from "@tanstack/react-query";
import PocketBase from "pocketbase";
import { formatToMedia } from "./format";

export const API_URL = import.meta.env.VITE_API_URL;

const pb = new PocketBase(API_URL);

export const PRODUCT_COLLECTION = "sen_products";
export const FILE_COLLECTION = "sen_files";
export const FILE_GRAPH_COLLECTION = "sen_file_graph";
export const PRODUCT_ATTRIBUTE_COLLECTION = "sen_product_attributes";
export const PRODUCT_ATTRIBUTE_VALUE_COLLECTION =
  "sen_product_attribute_values";
export const PRODUCT_VARIANT_COLLECTION = "sen_product_variants";
export const PRODUCT_VARIANT_ATTRIBUTES_COLLECTION =
  "sen_product_variant_attributes";
export const CATEGORY_COLLECTION = "sen_categories";
export const ORDER_COLLECTION = "sen_orders";
export const ORDER_ITEM_COLLECTION = "sen_order_items";
export const USER_COLLECTION = "sen_users";

pb.autoCancellation(false);
export { pb };

export const productQueryOptions = (id: string) =>
  queryOptions<ProductDataType>({
    queryKey: [PRODUCT_COLLECTION, id],
    queryFn: () =>
      pb.collection(PRODUCT_COLLECTION).getOne(id, { expand: "thumbnail" }),
  });

export const productFilesQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: [FILE_GRAPH_COLLECTION, productId],
    queryFn: () =>
      pb.collection(FILE_GRAPH_COLLECTION).getFullList({
        filter: `product = "${productId}"`,
        expand: "file",
      }),
    select(data) {
      return formatToMedia(data);
    },
  });

export const productCategoryQueryOptions = () =>
  queryOptions({
    queryKey: [CATEGORY_COLLECTION],
    queryFn: () => pb.collection(CATEGORY_COLLECTION).getFullList({}),
  });

export const productVariantQueryOptions = (productId: string) =>
  queryOptions({
    queryKey: [PRODUCT_VARIANT_ATTRIBUTES_COLLECTION, productId],
    queryFn: async () => {
      const res = await pb
        .collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION)
        .getFullList({
          filter: `variant.product = "${productId}"`,
          expand: "attribute,attribute_value,variant",
          sort: "attribute_value.order",
        });

      return res;
    },
  });
