import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	name: z.string().min(1, { message: "Vui lòng nhập tên cửa hàng" }),
	description: z.string().optional(),
	email: z
		.email({ message: "Địa chỉ email không hợp lệ" })
		.min(1, { message: "Vui lòng nhập địa chỉ email" }),
	phone: z.string().min(1, { message: "Vui lòng nhập số điện thoại" }),
});

export type StoreSettingFormValuesType = z.infer<typeof formSchema>;

interface StoreSettingFormProps {
	defaultValues: StoreSettingFormValuesType;
	ref: React.Ref<UseFormReturn<StoreSettingFormValuesType>>;
}

export default function StoreSettingForm({
	defaultValues,
	ref,
}: StoreSettingFormProps) {
	const form = useForm<StoreSettingFormValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	useImperativeHandle(ref, () => form);

	return (
		<Form {...form}>
			<form className="grid grid-cols-12 gap-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem className="col-span-12">
							<FormLabel>Tên cửa hàng</FormLabel>
							<FormControl>
								<Input
									placeholder="Tên cửa hàng"
									type="text"
									className="bg-white"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>Tài khoản email</FormLabel>
							<FormControl>
								<Input
									placeholder="Email"
									type="email"
									className="bg-white"
									{...field}
								/>
							</FormControl>
							<FormMessage />
							<FormDescription>
								Email được sử dụng cho hỗ trợ khách hàng
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>Số điện thoại</FormLabel>
							<FormControl>
								<Input
									placeholder="Số điện thoại"
									type="tel"
									className="bg-white"
									{...field}
								/>
							</FormControl>
							<FormMessage />
							<FormDescription>
								Số điện thoại được sử dụng cho hỗ trợ khách hàng
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="col-span-12">
							<FormLabel>Mô tả trang</FormLabel>
							<FormControl>
								<AutosizeTextarea
									placeholder="Mô tả trang"
									className="bg-white resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
