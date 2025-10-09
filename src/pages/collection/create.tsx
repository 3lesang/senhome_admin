import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ImagePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { createCollectionHander } from "@/api/collection/mutation/create";
import { FileDialog } from "@/components/dialog/file";
import { TextEditor } from "@/components/input/editor";
import ScheduleInput from "@/components/input/schedule";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
	name: z.string().min(1, "Name is required"),
	content: z.union([z.string(), z.record(z.string(), z.any()), z.null()]),
	type: z.enum(["manual", "smart"]),
	file: z.object({ id: z.string(), url: z.string() }).nullable(),
	schedule: z.date().nullable(),
	slug: z.string(),
	title: z.string(),
	description: z.string(),
});

export type FormValues = z.infer<typeof schema>;

export function CollectionCreatePage() {
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			content: null,
			slug: "",
			type: "manual",
			title: "",
			description: "",
			file: null,
			schedule: null,
		},
	});

	const { isPending } = useMutation({
		mutationFn: createCollectionHander,
		onSuccess: () => {
			toast.success("Tạo bộ sưu tập thành công");
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
						<CardTitle>Thêm nhóm sản phẩm</CardTitle>
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
							<Card className="border-0 shadow-none">
								<CardHeader>
									<CardTitle>Loại bộ sưu tập</CardTitle>
									<CardDescription>
										Bạn có thể chọn một trong hai cách bên dưới để thêm sản phẩm
										vào danh mục này.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="type"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<RadioGroup
														onValueChange={field.onChange}
														value={field.value}
													>
														<FormItem className="flex items-center space-x-2">
															<FormControl>
																<RadioGroupItem value="manual" />
															</FormControl>
															<FormLabel>Tự chọn sản phẩm</FormLabel>
														</FormItem>
														<FormItem className="flex items-center space-x-2">
															<FormControl>
																<RadioGroupItem value="smart" />
															</FormControl>
															<FormLabel>
																Sản phẩm tự động cập nhật dựa trên những điều
																kiện.
															</FormLabel>
														</FormItem>
													</RadioGroup>
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
										name="title"
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
										name="description"
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
										render={() => (
											<FormItem>
												<FormControl>
													<FileDialog value={[]}>
														<button
															type="button"
															className="flex justify-center items-center aspect-square border border-dashed bg-neutral-50/20 rounded-md hover:bg-neutral-50/30 transition-colors hover:cursor-pointer"
														>
															<ImagePlusIcon size={16} />
														</button>
													</FileDialog>
												</FormControl>
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
