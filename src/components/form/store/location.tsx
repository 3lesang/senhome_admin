import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
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

const formSchema = z.object({
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

export type StoreLocationFormValuesType = z.infer<typeof formSchema>;

interface StoreLocationFormProps {
	defaultValues: StoreLocationFormValuesType;
	ref: React.Ref<UseFormReturn<StoreLocationFormValuesType>>;
}

export default function StoreLocationForm({
	defaultValues,
	ref,
}: StoreLocationFormProps) {
	const form = useForm<StoreLocationFormValuesType>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	useImperativeHandle(ref, () => form);

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

	const province = form.watch("province");

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

	const district = form.watch("district");

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

	return (
		<Form {...form}>
			<form className="grid grid-cols-12 gap-8">
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
							<FormLabel className="flex shrink-0">Tỉnh/Thành Phố</FormLabel>

							<div className="w-full">
								<FormControl>
									<Select
										value={field.value.id}
										onValueChange={(value) => {
											const province = provinces?.find((p) => p.id === value);
											field.onChange({ id: value, name: province?.name });
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
							<FormLabel className="flex shrink-0">Quận/Huyện</FormLabel>

							<div className="w-full">
								<FormControl>
									<Select
										value={field.value.id}
										onValueChange={(value) => {
											const district = districts?.find(
												(d: { id: string }) => d.id === value,
											);
											field.onChange({ id: value, name: district?.name });
											form.setValue("ward", {
												id: "",
												name: "",
											});
										}}
									>
										<SelectTrigger className="w-full" disabled={!province}>
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
										<SelectTrigger className="w-full" disabled={!district}>
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
			</form>
		</Form>
	);
}
