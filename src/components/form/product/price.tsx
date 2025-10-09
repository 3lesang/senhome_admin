import { zodResolver } from "@hookform/resolvers/zod";
import { type Ref, useImperativeHandle } from "react";
import { type UseFormReturn, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import z from "zod";
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
	price: z.number().min(0).catch(0),
	sale_price: z.number().min(0).catch(0),
});

export type ProductPriceFormValuesType = z.infer<typeof schema>;

interface ProductPriceProps {
	ref?: Ref<UseFormReturn<ProductPriceFormValuesType>>;
	defaultValues?: ProductPriceFormValuesType;
}

export function ProductPriceForm({ ref, defaultValues }: ProductPriceProps) {
	const form = useForm<ProductPriceFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues: {
			price: defaultValues?.price ?? 0,
			sale_price: defaultValues?.sale_price ?? 0,
		},
	});

	useImperativeHandle(ref, () => form);
	return (
		<Card className="shadow-none border-0">
			<CardHeader>
				<CardTitle>Giá sản phẩm</CardTitle>
			</CardHeader>
			<Form {...form}>
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
										onValueChange={(v) => field.onChange(Number(v.value))}
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
										onValueChange={(v) => field.onChange(Number(v.value))}
										inputMode="decimal"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</CardContent>
			</Form>
		</Card>
	);
}
