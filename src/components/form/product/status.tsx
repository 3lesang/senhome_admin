import { zodResolver } from "@hookform/resolvers/zod";
import { type Ref, useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const schema = z.object({
	status: z.enum(["active", "draft"]),
});

export type ProductStatusFormValuesType = z.infer<typeof schema>;

type ProductStatusProps = {
	ref?: Ref<UseFormReturn<ProductStatusFormValuesType>>;
	defaultValues?: ProductStatusFormValuesType;
};

export function ProductStatusForm({ ref, defaultValues }: ProductStatusProps) {
	const form = useForm<ProductStatusFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues: {
			status: defaultValues?.status ?? "active",
		},
	});
	useImperativeHandle(ref, () => form);
	return (
		<Card className="shadow-none border-0">
			<CardHeader>
				<CardTitle>Trạng thái</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<Select value={field.value} onValueChange={field.onChange}>
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
				</Form>
			</CardContent>
		</Card>
	);
}
