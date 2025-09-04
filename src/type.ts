import type { FileType } from "./components/media/schema";

export type ProductDataType = {
  id: string;
  name: string;
  description?: string;
  content?: string;
  slug: string;
  price: number;
  discount: number;
  category: string;
  expand: {
    thumbnail: any;
  };
  deleted: Date;
};

export type UpdateProductDataType = {
  name?: string;
  content?: string;
  slug?: string;
  price?: number;
  discount?: number;
  category?: string;
  thumbnail?: string;
  deleted?: Date | null;
};

type Option = {
  id: string;
  name: string;
};

type Attribute = {
  id: string;
  name: string;
  options: Record<string, Option>;
};

type Variant = {
  id: string;
  price: number;
  discount: number;
  stock: number;
  sku: string;
  image?: FileType[];
};

type VariantOption = {
  option: Option;
  variant: Variant;
};

export type AttributeDataList = Record<string, Attribute>;

export type VariantOptions = Variant & {
  options: Record<string, Option>;
};

export type VariantData = Record<string, VariantOption>;

export type VariantDataList = Record<string, VariantData>;
