import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { createMenuHandler } from "@/api/menu/create";
import { TreeMenu } from "@/components/input/tree/TreeMenu";
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

const schema = z.object({
	name: z.string().min(1),
	position: z.enum(["header", "footer"]),
	items: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			url: z.string(),
			parentId: z.string().nullable(),
			order: z.number(),
		}),
	),
});

type FormValues = z.infer<typeof schema>;

export function MenuCreatePage() {
	const form = useForm<FormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			position: "header",
			items: [],
		},
	});

	const { isPending } = useMutation({
		mutationFn: createMenuHandler,
		onSuccess: () => {
			toast.success("Tạo menu thành công");
		},
	});

	const handleSubmit = (values: FormValues) => {
		console.log(values);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
					<CardHeader>
						<CardTitle>Thêm menu</CardTitle>
					</CardHeader>
					<CardContent className="grid grid-cols-12 gap-4">
						<div className="col-span-8 space-y-4">
							<Card className="shadow-none border-0">
								<CardContent>
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Tên menu</FormLabel>
												<FormControl>
													<Input placeholder="Nhập tên menu" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
							<Card className="border-0 shadow-none">
								<CardHeader>
									<CardTitle>Liên kết</CardTitle>
									<CardDescription>
										Danh sách liên kết website , giúp khách hàng chuyển trang
										trong cửa hàng của bạn. Bạn có thể tạo các menu lồng nhau để
										hiện thị drop-down menus
									</CardDescription>
								</CardHeader>
								<CardContent>
									<FormField
										control={form.control}
										name="items"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<TreeMenu {...field} />
												</FormControl>
												<FormDescription>
													Nhấp chuột phải vào menu con để mở menu
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
							</Card>
						</div>
						<div className="col-span-4">
							<Card className="border-0 shadow-none">
								<CardContent>
									<FormField
										control={form.control}
										name="position"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Vị trí</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
												>
													<FormControl>
														<SelectTrigger className="w-full">
															<SelectValue placeholder="Vị trí menu" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="header">Header</SelectItem>
														<SelectItem value="footer">Footer</SelectItem>
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
						<Button type="submit" disabled={isPending} className="ml-auto">
							{isPending && <Spinner />}
							Lưu
						</Button>
					</CardFooter>
				</Card>
			</form>
		</Form>
	);
}
