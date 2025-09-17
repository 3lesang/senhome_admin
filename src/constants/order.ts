export const ORDER_STATUS = {
	created: {
		label: "Đã tạo",
		variant: 0,
	},
	completed: {
		label: "Đã hoàn thành",
		variant: 1,
	},
	canceled: {
		label: "Đã hủy",
		variant: 2,
	},
} as const;

export const PAYMENT_METHOD = {
	crash: {
		label: "Thanh toán khi nhận hàng",
	},
} as const;
