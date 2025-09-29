import { zodResolver } from "@hookform/resolvers/zod";
import { useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import z from "zod";
import { Card, CardContent } from "./ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const schema = z.object({
	name: z.string().min(1),
	position: z.enum(["header", "footer"]),
});

export type MenuFormValuesType = z.infer<typeof schema>;

interface MenuFormProps {
	defaultValues: MenuFormValuesType;
	ref: React.Ref<UseFormReturn<MenuFormValuesType>>;
}

export default function MenuForm({ defaultValues, ref }: MenuFormProps) {
	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues,
	});

	useImperativeHandle(ref, () => form);

	return (
		<Form {...form}>
			<form className="grid grid-cols-12 gap-8">
				<div className="col-span-8">
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
