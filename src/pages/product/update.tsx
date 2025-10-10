import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { ChevronDownIcon, Trash2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";
import { getCollectionsProductQueryOptions } from "@/api/collection/list";
import { getOptionsProductQueryOptions } from "@/api/option/list";
import { productQueryOptions } from "@/api/product/one";
import { updateProductHander } from "@/api/product/update";
import { getVariantsProductQueryOptions } from "@/api/variant/list";
import { TextEditor } from "@/components/input/editor";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
	name: z.string(),
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
	options: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			values: z.array(z.object({ id: z.string(), name: z.string() })),
		}),
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

export type FormValues = z.infer<typeof schema>;

export function ProductUpdatePage() {
	const { id } = useParams({ from: "/(app)/products/$id" });
	const { data: product } = useSuspenseQuery(productQueryOptions(id));
	const { data: options } = useSuspenseQuery(getOptionsProductQueryOptions(id));
	const { data: variants } = useSuspenseQuery(
		getVariantsProductQueryOptions(id),
	);
	const { data: collections } = useSuspenseQuery(
		getCollectionsProductQueryOptions(id),
	);

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: product.name,
			content: product.content,
			file: product.file,
			slug: product.slug,
			price: product.price,
			sale_price: product.sale_price,
			options,
			variants,
			collections,
			seo: {
				title: product.seo?.title,
				description: product.seo.description,
			},
			status: product.status,
		},
	});

	const { isPending } = useMutation({
		mutationFn: updateProductHander,
		onSuccess: () => {
			toast.success("Update product successfully");
		},
	});

	function handleSubmit(values: FormValues) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
					<CardHeader>
						<CardTitle>{product.name}</CardTitle>
						<CardAction className="flex gap-2">
							<Button type="button" variant="secondary">
								Xem trước
							</Button>
							<Button type="button" variant="secondary">
								Nhân bản
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button type="button" variant="secondary">
										Thêm hành động
										<ChevronDownIcon />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>
										<Trash2Icon />
										Xóa sản phẩm
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</CardAction>
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
													<NumericFormat
														value={field.value}
														className="bg-white"
														thousandSeparator
														suffix=" đ"
														customInput={Input}
														onValueChange={(v) =>
															field.onChange(Number(v.value))
														}
														inputMode="decimal"
													/>
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
													<NumericFormat
														value={field.value}
														className="bg-white"
														thousandSeparator
														suffix=" đ"
														customInput={Input}
														onValueChange={(v) =>
															field.onChange(Number(v.value))
														}
														inputMode="decimal"
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
												<FormLabel>Tiêu đề trang</FormLabel>
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
												<FormLabel>Mô tả trang</FormLabel>
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
