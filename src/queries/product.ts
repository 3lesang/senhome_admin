import { queryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios";
import { PRODUCT_QUERY_KEY } from "@/constants";
import type { JSONContent } from "@tiptap/core";

type Params = {
  page: number;
  size: number;
};

type ProductData = {
  id: number;
  name: string;
  file: string;
  is_active: boolean;
};

type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

type OneProduct = {
  id: number;
  name: string;
  slug: string;
  origin_price: number;
  sale_price: number;
  meta_title: string;
  meta_description: string;
  category_id: number;
  is_active: boolean;
  files: string[];
  tags: string[];
  options: {
    id?: number;
    name: string;
    values?: { id?: number; name: string }[];
  }[];
  variants: {
    id?: number;
    file: string;
    origin_price: number;
    sale_price: number;
    stock: number;
    discount: number;
    sku: string;
    options: { option_name: string; value: string }[];
  }[];
  collections: { id: number; name: string }[];
};

export function getProductsQueryOptions(params: Params) {
  const { page, size } = params;
  return queryOptions({
    queryKey: [PRODUCT_QUERY_KEY, page, size],
    queryFn: () => {
      return axiosClient.get<PaginationResponse<ProductData>>("/products", {
        params: { page, page_size: size },
      });
    },
  });
}

export function getProductQueryOptions(id: string) {
  return queryOptions({
    queryKey: [PRODUCT_QUERY_KEY, id],
    queryFn: () => {
      return axiosClient.get<OneProduct>(`/products/${id}`);
    },
  });
}

export function getProductContentQueryOptions(slug: string) {
  return queryOptions({
    queryKey: [PRODUCT_QUERY_KEY, slug],
    queryFn: () => {
      return axiosClient.get<JSONContent>(
        `https://bucket.senhome.vn/content/product/${slug}`,
      );
    },
  });
}
