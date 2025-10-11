import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Activity } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { getOneCollectionQueryOptions } from "@/api/collection/one";
import { updateCollectionHandler } from "@/api/collection/update";
import { getProductsCollectionQueryOptions } from "@/api/product/list";
import { CollectionConditionInput } from "@/components/form/collection/conditions";
import { CollectionImageInput } from "@/components/form/collection/image";
import { CollectionProductInput } from "@/components/form/collection/product";
import ScheduleInput from "@/components/form/collection/schedule";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
	id: z.string(),
	name: z.string().min(1, "Name is required"),
	slug: z.string(),
	content: z.union([z.string(), z.record(z.string(), z.any()), z.null()]),
	type: z.enum(["manual", "smart"]),
	file: z.object({ id: z.string(), url: z.string() }).nullable(),
	schedule: z.date().nullable(),
	seo: z.object({
		title: z.string(),
		description: z.string(),
	}),
	conditions: z.string(),
	layout: z.enum(["default", "hero", "home"]),
	products: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			thumbnail: z.string(),
		}),
	),
});

type FormValues = z.infer<typeof schema>;

export function CollectionUpdatePage() {
	const { id } = useParams({ from: "/(app)/products/collections/$id" });
	const { data: collection } = useSuspenseQuery(
		getOneCollectionQueryOptions(id),
	);
	const { data: products } = useSuspenseQuery(
		getProductsCollectionQueryOptions(id),
	);

	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			id: collection.id,
			name: collection.name,
			slug: collection.slug,
			content: collection.content,
			type: collection.type,
			seo: {
				title: collection.seo?.title,
				description: collection.seo?.description,
			},
			file: collection.file,
			schedule: collection.schedule,
			layout: collection.layout,
			products,
			conditions: collection.conditions,
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: updateCollectionHandler,
		onSuccess: () => {
			toast.success("Update collection successfully");
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
						<CardTitle>{collection.name}</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-12 gap-4">
						<div className="col-span-8 space-y-4">
							<Card className="border-0 shadow-none">
								<CardHeader>
									<CardTitle>Thông tin chung</CardTitle>
									<CardDescription>Tên, mô tả nhóm sản phẩm</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tên</FormLabel>
												<FormControl>
													<Input
														placeholder="ví dụ, sản phẩm mới nhất,..."
														{...field}
													/>
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
												<FormLabel>Mô tả</FormLabel>
												<FormControl>
													<TextEditor {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Activity
								mode={form.watch("type") === "manual" ? "visible" : "hidden"}
							>
								<Card className="border-0 shadow-none">
									<CardHeader>
										<CardTitle>Sản phẩm</CardTitle>
										<CardDescription>
											Thêm từng sản phẩm vào bộ sưu tập này.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<FormField
											control={form.control}
											name="products"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<CollectionProductInput {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</CardContent>
								</Card>
							</Activity>
							<Activity
								mode={form.watch("type") === "smart" ? "visible" : "hidden"}
							>
								<Card className="border-0 shadow-none">
									<CardHeader>
										<CardTitle>Điều kiện</CardTitle>
										<CardDescription>
											Các sản phẩm sẽ được tự động đưa vào danh mục này dựa vào
											các điều kiện bên dưới.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<FormField
											control={form.control}
											name="conditions"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<CollectionConditionInput {...field} />
													</FormControl>
												</FormItem>
											)}
										/>
									</CardContent>
								</Card>
							</Activity>
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
													https://senhome.vn/collections/{form.watch("slug")}
												</FormDescription>
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</div>
						<div className="col-span-4 space-y-4">
							<Card className="border-0 shadow-none">
								<CardHeader>
									<CardTitle>Xuất bản</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="schedule"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Kênh bán hàng</FormLabel>
												<FormControl>
													<ScheduleInput {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="border-0 shadow-none">
								<CardHeader>
									<CardTitle>Hình ảnh</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="file"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<CollectionImageInput {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="border-0 shadow-none">
								<CardHeader>
									<CardTitle>Bố cục</CardTitle>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="layout"
										render={({ field }) => (
											<FormItem>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="default">Default</SelectItem>
														<SelectItem value="hero">Hero</SelectItem>
														<SelectItem value="home">Home page</SelectItem>
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
						<Button type="submit" className="ml-auto" disabled={isPending}>
							{isPending && <Spinner />}
							Lưu
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
