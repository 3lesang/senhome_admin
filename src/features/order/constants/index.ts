export const ORDER_STATUS = {
  created: {
    label: "Đã tạo",
    class: "bg-green-600 text-white",
  },
  completed: {
    label: "Đã hoàn thành",
    class: "bg-black text-white",
  },
  canceled: {
    label: "Đã hủy",
    class: "bg-gray-600 text-white",
  },
} as const;

export const PAYMENT_METHOD = {
  crash: {
    label: "Thanh toán khi nhận hàng",
  },
} as const;
