export type Product = {
  id: string;
  name: string;
  description?: string;
  content?: string;
  slug: string;
  price: number;
  expand: {
    thumbnail: any;
  };
};

export type FileType = {
  id: string;
  expand: {
    image: any;
  };
};
