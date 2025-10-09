import { zodResolver } from "@hookform/resolvers/zod";
import { type Ref, useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import z from "zod";
import Editor from "@/components/editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
	name: z.string().min(1, "Product name is required"),
	content: z.string().optional(),
});

export type ProductInfoFormValuesType = z.infer<typeof schema>;

interface ProductInfoFormProps {
	ref?: Ref<UseFormReturn<ProductInfoFormValuesType>>;
	defaultValues?: ProductInfoFormValuesType;
}

export function ProductInfoForm({ ref, defaultValues }: ProductInfoFormProps) {
	const form = useForm<ProductInfoFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: defaultValues?.name ?? "",
			content: defaultValues?.content ?? "",
		},
	});

	useImperativeHandle(ref, () => form);

	return (
		<Card className="shadow-none border-0">
			<CardHeader>
				<CardTitle>Thông tin chung</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<Form {...form}>
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
									<Editor content={field.value} onChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</Form>
			</CardContent>
		</Card>
	);
}
