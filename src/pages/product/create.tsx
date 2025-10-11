import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";
import { createProductHandler } from "@/api/product/create";
import { CollectionInput } from "@/components/form/product/collection";
import { MediaInput } from "@/components/form/product/media";
import { ProductOptions } from "@/components/form/product/options";
import { TagInput } from "@/components/form/product/tag";
import { ProductVariant } from "@/components/form/product/variant";
import { TextEditor } from "@/components/input/editor";
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
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { checkDuplicateNames } from "@/lib/utils";

const schema = z.object({
	id: z.string(),
	name: z.string().min(1, "Name is required"),
	content: z.union([z.string(), z.record(z.string(), z.any()), z.null()]),
	file: z.array(z.object({ id: z.string(), url: z.string() })),
	price: z.number(),
	sale_price: z.number(),
	slug: z.string(),
	seo: z.object({
		title: z.string(),
		description: z.string(),
	}),
	status: z.enum(["active", "draft"]),
	tag: z.string(),
	options: z
		.array(
			z.object({
				id: z.string(),
				name: z.string().min(1, "Name is required"),
				values: z
					.array(
						z.object({
							id: z.string(),
							name: z.string().min(1, "Value name is required"),
						}),
					)
					.superRefine((values, ctx) =>
						checkDuplicateNames(values, ctx, "This value name already exists"),
					),
			}),
		)
		.superRefine((options, ctx) =>
			checkDuplicateNames(options, ctx, "This value name already exists"),
		),
	variants: z.array(
		z.object({
			id: z.string(),
			price: z.number(),
			sale_price: z.number(),
			stock: z.number(),
			sku: z.string(),
			combos: z.string(),
			file: z.object({ id: z.string(), url: z.string() }).nullable(),
		}),
	),
	collections: z.array(z.object({ id: z.string(), name: z.string() })),
});

type FormValues = z.infer<typeof schema>;

export function ProductCreatePage() {
	const navigate = useNavigate();
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			id: "",
			name: "",
			content: null,
			file: [],
			slug: "",
			price: 0,
			sale_price: 0,
			seo: {
				title: "",
				description: "",
			},
			status: "draft",
			tag: "",
			options: [],
			variants: [],
			collections: [],
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: createProductHandler,
		onSuccess: () => {
			toast.success("Create product successfully");
			navigate({ to: "/products" });
		},
	});

	function handleSubmit(values: FormValues) {
		mutate(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
					<CardHeader>
						<CardTitle>Thêm sản phẩm</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-12 gap-4">
						<div className="col-span-8 space-y-4">
							<Card className="shadow-none border-0">
								<CardHeader>
									<CardTitle>Thông tin chung</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tên sản phẩm</FormLabel>
												<FormControl>
													<Input placeholder="Tên sản phẩm" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="content"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Mô tả sản phẩm</FormLabel>
												<FormControl>
													<TextEditor {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="shadow-none border-0">
								<CardHeader>
									<CardTitle>Hình ảnh sản phẩm</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="file"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<MediaInput {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="shadow-none border-0">
								<CardHeader>
									<CardTitle>Giá sản phẩm</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Giá so sánh</FormLabel>
												<FormControl>
													<InputGroup>
														<InputGroupAddon>
															<InputGroupText>$</InputGroupText>
														</InputGroupAddon>
														<NumericFormat
															value={field.value}
															thousandSeparator
															customInput={InputGroupInput}
															onValueChange={(v) =>
																field.onChange(Number(v.value))
															}
														/>
														<InputGroupAddon align="inline-end">
															<InputGroupText>VNĐ</InputGroupText>
														</InputGroupAddon>
													</InputGroup>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="sale_price"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Giá bán</FormLabel>
												<FormControl>
													<InputGroup>
														<InputGroupAddon>
															<InputGroupText>$</InputGroupText>
														</InputGroupAddon>
														<NumericFormat
															value={field.value}
															thousandSeparator
															customInput={InputGroupInput}
															onValueChange={(v) =>
																field.onChange(Number(v.value))
															}
														/>
														<InputGroupAddon align="inline-end">
															<InputGroupText>VNĐ</InputGroupText>
														</InputGroupAddon>
													</InputGroup>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="shadow-none border-0">
								<CardHeader>
									<CardTitle>Biến thể</CardTitle>
								</CardHeader>
								<CardContent>
									<ProductOptions form={form} />
									<ProductVariant form={form} />
								</CardContent>
							</Card>
							<Card className="border-0 shadow-none">
								<CardHeader>
									<CardTitle>Tối ưu SEO</CardTitle>
									<CardDescription>
										Thiết lập các thẻ mô tả giúp khách hàng dễ dàng tìm thấy
										danh mục này trên công cụ tìm kiếm như Google.
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="seo.title"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tiêu đề</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="seo.description"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Mô tả</FormLabel>
												<FormControl>
													<Textarea className="resize-none" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="slug"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Đường dẫn</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormMessage />
												<FormDescription>
													https://senhome.vn/products/{form.watch("slug")}
												</FormDescription>
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</div>
						<div className="col-span-4 space-y-4">
							<Card className="shadow-none border-0">
								<CardHeader>
									<CardTitle>Trạng thái</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="status"
										render={({ field }) => (
											<FormItem>
												<Select
													value={field.value}
													onValueChange={field.onChange}
												>
													<FormControl>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Chọn trạng thái" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="active">Hoạt động</SelectItem>
														<SelectItem value="draft">Bản nháp</SelectItem>
													</SelectContent>
												</Select>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="shadow-none border-0">
								<CardHeader>
									<CardTitle>Nhóm sản phẩm</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="collections"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<CollectionInput {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="shadow-none border-0">
								<CardHeader>
									<CardTitle>Nhãn</CardTitle>
									<CardDescription>
										Nhập và nhấn enter để thêm thẻ
									</CardDescription>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="tag"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<TagInput {...field} />
												</FormControl>
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</div>
					</CardContent>
					<CardFooter>
						<Button
							type="submit"
							className="ml-auto"
							disabled={isPending || !form.formState.isDirty}
						>
							{isPending && <Spinner />}
							Lưu
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
