import z from "zod";
import { pocketClient, STORE_COLLECTION } from "@/pocketbase";

const schema = z.object({
	id: z.string(),
	name: z.string().min(1, { message: "Vui lòng nhập tên cửa hàng" }),
	description: z.string().optional(),
	email: z
		.email({ message: "Địa chỉ email không hợp lệ" })
		.min(1, { message: "Vui lòng nhập địa chỉ email" }),
	phone: z.string().min(1, { message: "Vui lòng nhập số điện thoại" }),
	street: z.string().min(2).max(100),
	province: z.object({
		value: z.string(),
		label: z.string().min(1, "Name is required"),
	}),
	district: z.object({
		value: z.string(),
		label: z.string().min(1, "Name is requied"),
	}),
	ward: z.object({
		value: z.string(),
		label: z.string().min(1, "Name is requied"),
	}),
});

type UpdateStorePayload = z.infer<typeof schema>;

export function updateStoreHandler(values: UpdateStorePayload) {
	return pocketClient.collection(STORE_COLLECTION).update(values.id, {
		name: values.name,
		description: values.description,
		email: values.email,
		phone: values.phone,
		address: {
			street: values.street,
			province: values.province,
			district: values.district,
			ward: values.ward,
		},
	});
}
