export type OrderDataType = {
  id: string;
  name: string;
  phone: string;
  final_price: number;
  email: string;
  price: number;
  status: string;
  payment_method: string;
  shipping_address: string;
};

export type OrderItemDataType = {
  id: string;
  name: string;
  price: number;
  discount: number;
  quantity: string;
  thumbnail: string;
  variant: string[];
};
