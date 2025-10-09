import { zodResolver } from "@hookform/resolvers/zod";
import { type Ref, useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import z from "zod";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
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

const schema = z.object({
	title: z.string().max(70),
	description: z.string().max(160),
	slug: z.string(),
});

export type ProductSEOFormValuesType = z.infer<typeof schema>;

interface ProductSEOProps {
	ref?: Ref<UseFormReturn<ProductSEOFormValuesType>>;
	defaultValues?: ProductSEOFormValuesType;
}

export function ProductSEOForm({ ref, defaultValues }: ProductSEOProps) {
	const form = useForm<ProductSEOFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues: {
			title: defaultValues?.title ?? "",
			description: defaultValues?.description ?? "",
			slug: defaultValues?.slug ?? "",
		},
	});

	useImperativeHandle(ref, () => form);

	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Tối ưu SEO</CardTitle>
				<CardDescription>
					Thiết lập các thẻ mô tả giúp khách hàng dễ dàng tìm thấy danh mục này
					trên công cụ tìm kiếm như Google.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tiêu đề trang</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormDescription>0 of 70 characters used</FormDescription>
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
										<AutosizeTextarea className="resize-none" {...field} />
									</FormControl>
									<FormDescription>0 of 160 characters used</FormDescription>
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
					</div>
				</Form>
			</CardContent>
		</Card>
	);
}
