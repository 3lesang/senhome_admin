import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getStoreQueryOptions } from "@/api/store/one";
import { updateStoreHandler } from "@/api/store/update";
import { DistrictSelect } from "@/components/address/district";
import { ProvinceSelect } from "@/components/address/province";
import { WardSelect } from "@/components/address/ward";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

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

export type FormValues = z.infer<typeof schema>;

export function StoreSettingsGeneral() {
	const { data: store } = useSuspenseQuery(getStoreQueryOptions());

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			id: store.id,
			name: store.name,
			description: store.description,
			email: store.email,
			phone: store.phone,
			street: store?.address?.street,
			province: store?.address?.province,
			district: store?.address?.district,
			ward: store?.address?.ward,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateStoreHandler,
		onSuccess: () => {
			toast.success("Update success");
		},
	});

	function handleSubmit(values: FormValues) {
		mutate(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="bg-sidebar border-0 shadow-none max-w-3xl mx-auto">
					<CardHeader>
						<CardTitle>Cấu hình cửa hàng</CardTitle>
						<CardDescription>
							Cấu hình thông tin chung của cửa hàng
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Card className="border-0 shadow-none">
							<CardHeader>
								<CardTitle>Thông tin cửa hàng</CardTitle>
								<CardDescription>
									Tên cửa hàng xuất hiện trên cửa hàng của bạn.
								</CardDescription>
							</CardHeader>
							<CardContent className="grid grid-cols-12 gap-8">
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
												<Textarea
													placeholder="Mô tả trang"
													className="bg-white resize-none"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
						<Card className="border-0 shadow-none">
							<CardHeader>
								<CardTitle>Nhận dạng thương hiệu</CardTitle>
								<CardDescription>
									Nơi quản lý tất cả các tài sản liên quan đến thương hiệu của
									cửa hàng, giúp đảm bảo tất cả những nơi sử dụng dữ liệu này
									đều có sự nhất quán về hình ảnh và nội dung.
								</CardDescription>
							</CardHeader>
							<CardContent></CardContent>
						</Card>
						<Card className="border-0 shadow-none">
							<CardHeader>
								<CardTitle>Địa chỉ cửa hàng</CardTitle>
								<CardDescription>
									Địa chỉ này sẽ xuất hiện trên hoá đơn của bạn và sẽ được sử
									dụng để tính toán mức giá vận chuyển của bạn.
								</CardDescription>
							</CardHeader>
							<CardContent className="grid grid-cols-12 gap-4">
								<FormField
									control={form.control}
									name="street"
									render={({ field }) => (
										<FormItem className="col-span-12">
											<FormLabel>Địa chỉ</FormLabel>
											<FormControl>
												<Input placeholder="Địa chỉ" type="text" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="province"
									render={({ field }) => (
										<FormItem className="col-span-12 lg:col-span-4">
											<FormLabel>Tỉnh/TP</FormLabel>
											<FormControl>
												<ProvinceSelect
													value={field.value}
													onChange={(value) => {
														field.onChange(value);
														form.setValue("district", {
															label: "",
															value: "",
														});
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="district"
									render={({ field }) => (
										<FormItem className="col-span-12 lg:col-span-4">
											<FormLabel>Quận/Huyện</FormLabel>
											<FormControl>
												<DistrictSelect
													value={field.value}
													onChange={(value) => {
														field.onChange(value);
														form.setValue("ward", {
															label: "",
															value: "",
														});
													}}
													id={form.watch("province")?.value}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="ward"
									render={({ field }) => (
										<FormItem className="col-span-12 lg:col-span-4">
											<FormLabel>Phường/Xã</FormLabel>
											<FormControl>
												<WardSelect
													value={field.value}
													onChange={field.onChange}
													id={form.watch("district")?.value}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					</CardContent>
					<CardFooter className="flex justify-end">
						<Button type="submit" disabled={isPending}>
							{isPending && <Spinner />}
							Lưu
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
