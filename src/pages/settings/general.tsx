import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
	name: z.string().min(1, { message: "Vui lòng nhập tên cửa hàng" }),
	description: z.string().optional(),
	email: z
		.email({ message: "Địa chỉ email không hợp lệ" })
		.min(1, { message: "Vui lòng nhập địa chỉ email" }),
	phone: z.string().min(1, { message: "Vui lòng nhập số điện thoại" }),
	street: z.string().min(2).max(100),
	province: z.object({
		id: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
		name: z.string().min(1, "Tên tỉnh/thành phố không hợp lệ"),
	}),
	district: z.object({
		id: z.string().min(1, "Vui lòng chọn quận/huyện"),
		name: z.string().min(1, "Tên quận/huyện không hợp lệ"),
	}),
	ward: z.object({
		id: z.string().min(1, "Vui lòng chọn phường/xã"),
		name: z.string().min(1, "Tên phường/xã không hợp lệ"),
	}),
});

export type FormValues = z.infer<typeof schema>;

export function StoreSettingsGeneral() {
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			description: "",
			email: "",
			phone: "",
		},
	});

	const province = form.watch("province");
	const district = form.watch("district");

	const { data: provinces } = useQuery({
		queryKey: ["provinces"],
		queryFn: () =>
			axios("https://open.oapi.vn/location/provinces", {
				params: {
					page: 0,
					size: 100,
				},
			}),

		select(data) {
			return data.data?.data as { id: string; name: string }[];
		},
	});

	const { data: districts } = useQuery({
		queryKey: ["districts", province.id],
		queryFn: () =>
			axios(`https://open.oapi.vn/location/districts/${province.id}`, {
				params: {
					page: 0,
					size: 100,
				},
			}),

		select(data) {
			return data.data?.data as { id: string; name: string }[];
		},
		enabled: !!province.id,
	});

	const { data: wards } = useQuery({
		queryKey: ["wards", district.id],
		queryFn: () =>
			axios(`https://open.oapi.vn/location/wards/${district.id}`, {
				params: {
					page: 0,
					size: 100,
				},
			}),

		select(data) {
			return data.data?.data as { id: string; name: string }[];
		},
		enabled: !!district.id,
	});

	function handleSubmit(values: FormValues) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
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
										<FormItem className="col-span-4 lg:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
											<FormLabel className="flex shrink-0">
												Tỉnh/Thành Phố
											</FormLabel>

											<div className="w-full">
												<FormControl>
													<Select
														value={field.value.id}
														onValueChange={(value) => {
															const province = provinces?.find(
																(p) => p.id === value,
															);
															field.onChange({
																id: value,
																name: province?.name,
															});
															form.setValue("district", {
																id: "",
																name: "",
															});
														}}
													>
														<SelectTrigger className="w-full ">
															<SelectValue placeholder="Tỉnh/Thành Phố" />
														</SelectTrigger>
														<SelectContent>
															{provinces?.map((item) => (
																<SelectItem key={item?.id} value={item?.id}>
																	{item?.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>

												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="district"
									render={({ field }) => (
										<FormItem className="col-span-4 lg:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
											<FormLabel className="flex shrink-0">
												Quận/Huyện
											</FormLabel>

											<div className="w-full">
												<FormControl>
													<Select
														value={field.value.id}
														onValueChange={(value) => {
															const district = districts?.find(
																(d: { id: string }) => d.id === value,
															);
															field.onChange({
																id: value,
																name: district?.name,
															});
															form.setValue("ward", {
																id: "",
																name: "",
															});
														}}
													>
														<SelectTrigger
															className="w-full"
															disabled={!province}
														>
															<SelectValue placeholder="Quận/Huyện" />
														</SelectTrigger>
														<SelectContent>
															{districts?.map((item) => (
																<SelectItem key={item?.id} value={item?.id}>
																	{item?.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>

												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="ward"
									render={({ field }) => (
										<FormItem className="col-span-4 lg:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
											<FormLabel className="flex shrink-0">Pường/Xã</FormLabel>

											<div className="w-full">
												<FormControl>
													<Select
														value={field.value.id}
														onValueChange={(value) => {
															const ward = wards?.find((w) => w.id === value);
															field.onChange({ id: value, name: ward?.name });
														}}
													>
														<SelectTrigger
															className="w-full"
															disabled={!district}
														>
															<SelectValue placeholder="Pường/Xã" />
														</SelectTrigger>
														<SelectContent>
															{wards?.map((item) => (
																<SelectItem key={item?.id} value={item?.id}>
																	{item?.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>

												<FormMessage />
											</div>
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					</CardContent>
					<CardFooter className="flex justify-end">
						<Button type="submit">Lưu</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
