import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type Resolver, type UseFormReturn, useForm } from "react-hook-form";
import z from "zod";
import TreeMenu from "@/components/tree/TreeMenu";
import {
	Card,
	CardContent,
	CardDescription,
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

const menuItemSchema = z.object({
	id: z.string(),
	title: z.string(),
	url: z.string(),
	parentId: z.string().nullable(),
	order: z.number(),
});

const schema = z.object({
	name: z.string().min(1),
	position: z.enum(["header", "footer"]),
	items: z.array(menuItemSchema),
});

export type MenuFormValuesType = z.infer<typeof schema>;
export type MenuItem = z.infer<typeof menuItemSchema>;

interface MenuFormProps {
	defaultValues: MenuFormValuesType;
	ref: React.Ref<UseFormReturn<MenuFormValuesType>>;
}

export default function MenuForm({ defaultValues, ref }: MenuFormProps) {
	const form = useForm<MenuFormValuesType>({
		resolver: zodResolver(schema) as Resolver<MenuFormValuesType>,
		defaultValues,
	});

	useImperativeHandle(ref, () => form);

	return (
		<Form {...form}>
			<form className="grid grid-cols-12 gap-8">
				<div className="col-span-8 space-y-8">
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
								Danh sách liên kết website , giúp khách hàng chuyển trang trong
								cửa hàng của bạn. Bạn có thể tạo các menu lồng nhau để hiện thị
								drop-down menus
							</CardDescription>
						</CardHeader>
						<CardContent>
							<FormField
								control={form.control}
								name="items"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<TreeMenu value={field.value} onChange={field.onChange} />
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
			</form>
		</Form>
	);
}
