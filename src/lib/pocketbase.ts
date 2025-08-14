import PocketBase from "pocketbase";

export const API_URL = import.meta.env.VITE_API_URL;

export const pb = new PocketBase(API_URL);

export const PRODUCT_COLLECTION = "sen_products";
export const IMAGE_COLLECTION = "sen_images";
export const PRODUCT_VARIANT_COLLECTION = "sen_product_variants";
export const PRODUCT_VARIANT_ATTRIBUTES_COLLECTION =
  "sen_product_variant_attributes";
export const CATEGORY_COLLECTION = "sen_categories";
export const ORDER_COLLECTION = "sen_orders";
export const ORDER_ITEM_COLLECTION = "sen_order_items";
export const USER_COLLECTION = "sen_users";
