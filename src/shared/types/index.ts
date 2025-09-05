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
