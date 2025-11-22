import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useForm } from "@tanstack/react-form";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { ImagePlusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
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
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { convertToFileUrl } from "@/lib/utils";
import { getStoreQueryOptions } from "@/queries/store";
import { s3Client } from "@/s3";

const schema = z.object({
	name: z.string(),
	description: z.string(),
	email: z.string(),
	phone: z.string(),
	address: z.string(),
	hotline: z.string(),
	zalo: z.string(),
	logo: z.instanceof(File).optional(),
	logo_url: z.string(),
	certificates: z.array(
		z.object({
			id: z.string().optional(),
			url: z.string(),
			file: z.instanceof(File).nullable().optional(),
			file_url: z.string(),
		}),
	),
});

export type FormValues = z.infer<typeof schema>;

export function StoreSettingsGeneral() {
	const getStoreQuery = useSuspenseQuery(getStoreQueryOptions());

	const saveMutation = useMutation({
		mutationFn: (value: FormValues) => {
			let logoURL = getStoreQuery.data.data.logo;
			if (value.logo) {
				const ext = value.logo?.name.split(".")[1];
				logoURL = `logo.${ext}`;
				s3Client.send(
					new PutObjectCommand({
						Bucket: "r2-bucket",
						Key: logoURL,
						Body: value.logo,
						ContentType: value.logo.type,
					}),
				);
			}
			if (value.certificates.length > 0) {
				for (const cer of value.certificates) {
					cer.file &&
						s3Client.send(
							new PutObjectCommand({
								Bucket: "r2-bucket",
								Key: `certificates/${cer.file?.name}`,
								Body: cer.file,
								ContentType: cer.file?.type,
							}),
						);
				}
			}
			const data = {
				name: value.name,
				description: value.description,
				email: value.email,
				phone: value.phone,
				address: value.address,
				hotline: value.hotline,
				zalo: value.zalo,
				logo: logoURL,
				certificates: value.certificates.map((c) => ({
					id: c.id,
					url: c.url,
					file_url: c.file?.name ? `certificates/${c.file?.name}` : c.file_url,
				})),
			};
			return s3Client.send(
				new PutObjectCommand({
					Bucket: "r2-bucket",
					Key: "store",
					Body: JSON.stringify(data),
					ContentType: "application/json",
				}),
			);
		},
		onSuccess: () => {
			toast.success("Update success");
		},
	});

	const defaultValues: FormValues = {
		name: getStoreQuery.data.data.name ?? "",
		description: getStoreQuery.data.data.description ?? "",
		email: getStoreQuery.data.data.email ?? "",
		phone: getStoreQuery.data.data.phone ?? "",
		address: getStoreQuery.data.data.address ?? "",
		zalo: getStoreQuery.data.data.zalo ?? "",
		hotline: getStoreQuery.data.data.hotline ?? "",
		logo_url: convertToFileUrl(getStoreQuery.data.data.logo) ?? "",
		certificates: getStoreQuery.data.data.certificates,
	};
	const form = useForm({
		defaultValues,
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => saveMutation.mutateAsync(value),
		onSubmitInvalid: ({ formApi }) => {
			console.log(formApi.getAllErrors());
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className="w-full"
		>
			<Card className="bg-sidebar border-0 shadow-none p-0">
				<CardHeader>
					<CardTitle>Cấu hình cửa hàng</CardTitle>
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
							<form.Field name="name">
								{(field) => (
									<Field className="col-span-12">
										<FieldLabel>Tên cửa hàng</FieldLabel>
										<Input
											placeholder="Tên cửa hàng"
											type="text"
											className="bg-white"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.currentTarget.value)
											}
										/>
									</Field>
								)}
							</form.Field>
							<form.Field name="email">
								{(field) => (
									<Field className="col-span-6">
										<FieldLabel>Tài khoản email</FieldLabel>
										<Input
											placeholder="Email"
											type="email"
											className="bg-white"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.currentTarget.value)
											}
										/>
									</Field>
								)}
							</form.Field>
							<form.Field name="phone">
								{(field) => (
									<Field className="col-span-6">
										<FieldLabel>Số điện thoại</FieldLabel>
										<Input
											placeholder="Số điện thoại"
											type="tel"
											className="bg-white"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.currentTarget.value)
											}
										/>
									</Field>
								)}
							</form.Field>
							<form.Field name="zalo">
								{(field) => (
									<Field className="col-span-6">
										<FieldLabel>Zalo</FieldLabel>
										<Input
											placeholder="Zalo"
											type="tel"
											className="bg-white"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.currentTarget.value)
											}
										/>
									</Field>
								)}
							</form.Field>
							<form.Field name="hotline">
								{(field) => (
									<Field className="col-span-6">
										<FieldLabel>Hotline</FieldLabel>
										<Input
											placeholder="Hotline"
											type="tel"
											className="bg-white"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.currentTarget.value)
											}
										/>
									</Field>
								)}
							</form.Field>
							<form.Field name="description">
								{(field) => (
									<Field className="col-span-12">
										<FieldLabel>Mô tả trang</FieldLabel>
										<Textarea
											placeholder="Mô tả trang"
											className="bg-white resize-none"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.currentTarget.value)
											}
										/>
									</Field>
								)}
							</form.Field>
						</CardContent>
					</Card>
					<Card className="border-0 shadow-none">
						<CardHeader>
							<CardTitle>Nhận dạng thương hiệu</CardTitle>
							<CardDescription>
								Nơi quản lý tất cả các tài sản liên quan đến thương hiệu của cửa
								hàng, giúp đảm bảo tất cả những nơi sử dụng dữ liệu này đều có
								sự nhất quán về hình ảnh và nội dung.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-12 gap-4">
							<form.Field name="logo_url">
								{(field) => (
									<Field className="col-span-3">
										<FieldLabel>Logo</FieldLabel>
										<label className="p-2 aspect-square flex justify-center items-center rounded-2xl border border-dashed hover:bg-neutral-50 cursor-pointer relative">
											<input
												type="file"
												className="hidden"
												onChange={(e) => {
													const [file] = e.currentTarget.files ?? [];
													if (!file) return;
													field.handleChange(URL.createObjectURL(file));
													field.form.setFieldValue("logo", file);
												}}
											/>
											{field.state.value ? (
												<div className="absolute inset-0">
													<img
														src={field.state.value}
														alt=""
														className="w-full h-full aspect-square rounded-2xl object-cover"
													/>
												</div>
											) : (
												<ImagePlusIcon />
											)}
										</label>
									</Field>
								)}
							</form.Field>
							<form.Field name="certificates" mode="array">
								{(field) => (
									<Field className="col-span-12">
										<FieldLabel>Chứng chỉ</FieldLabel>
										<div className="space-y-2">
											{field.state.value.map((item, i) => (
												<div key={item.id} className="flex gap-2 items-center">
													<form.Field name={`certificates[${i}].file_url`}>
														{(fileField) => (
															<label className="size-32 aspect-square flex justify-center items-center border border-dashed rounded-md cursor-pointer hover:bg-neutral-50">
																<input
																	className="hidden"
																	type="file"
																	onChange={(e) => {
																		const [file] = e.currentTarget.files ?? [];
																		const fileUrl = URL.createObjectURL(file);
																		fileField.handleChange(fileUrl);
																		field.form.setFieldValue(
																			`certificates[${i}].file`,
																			file,
																		);
																	}}
																/>
																{fileField.state.value ? (
																	<form.Subscribe
																		selector={(state) =>
																			state.values.certificates[i].file
																		}
																	>
																		{(file) => (
																			<img
																				src={
																					file
																						? fileField.state.value
																						: convertToFileUrl(
																								fileField.state.value,
																							)
																				}
																				alt=""
																				className="w-full h-full object-contain"
																			/>
																		)}
																	</form.Subscribe>
																) : (
																	<ImagePlusIcon size={18} />
																)}
															</label>
														)}
													</form.Field>
													<form.Field name={`certificates[${i}].url`}>
														{(urlField) => (
															<Input
																value={urlField.state.value}
																onChange={(e) =>
																	urlField.handleChange(e.currentTarget.value)
																}
															/>
														)}
													</form.Field>
													<Button
														type="button"
														size="icon"
														variant="outline"
														onClick={() => field.removeValue(i)}
													>
														<Trash2Icon />
													</Button>
												</div>
											))}
											<Button
												type="button"
												variant="outline"
												className="w-full"
												onClick={() =>
													field.pushValue({
														id: crypto.randomUUID(),
														url: "",
														file: null,
														file_url: "",
													})
												}
											>
												<PlusIcon />
											</Button>
										</div>
									</Field>
								)}
							</form.Field>
						</CardContent>
					</Card>
					<Card className="border-0 shadow-none">
						<CardHeader>
							<CardTitle>Địa chỉ cửa hàng</CardTitle>
							<CardDescription>
								Địa chỉ này sẽ xuất hiện trên hoá đơn của bạn và sẽ được sử dụng
								để tính toán mức giá vận chuyển của bạn.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-12 gap-4">
							<form.Field name="address">
								{(field) => (
									<Field className="col-span-12">
										<FieldLabel>Địa chỉ</FieldLabel>
										<Input
											placeholder="Địa chỉ"
											type="text"
											value={field.state.value}
											onChange={(e) =>
												field.handleChange(e.currentTarget.value)
											}
										/>
									</Field>
								)}
							</form.Field>
						</CardContent>
					</Card>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						className="ml-auto"
						disabled={saveMutation.isPending}
					>
						{saveMutation.isPending && <Spinner />}
						Lưu
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
