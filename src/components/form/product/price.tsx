import type { UseFormReturn } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { ProductFormType } from "@/types/product";

interface ProductPriceProps {
	form: UseFormReturn<ProductFormType>;
}

export default function ProductPrice({ form }: ProductPriceProps) {
	return (
		<Card className="shadow-none border-0">
			<CardHeader>
				<CardTitle>Giá</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-12 gap-8">
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Giá</FormLabel>
									<FormControl>
										<NumericFormat
											value={field.value}
											className="bg-white"
											thousandSeparator
											prefix="đ "
											customInput={Input}
											onValueChange={(v) => field.onChange(v.value)}
											placeholder="đ 0"
											inputMode="decimal"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="discount"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Khuyến mãi</FormLabel>
									<FormControl>
										<NumericFormat
											value={field.value}
											className="bg-white"
											prefix="% "
											customInput={Input}
											allowNegative={false}
											placeholder="% "
											isAllowed={({ floatValue }) =>
												floatValue == null ||
												(floatValue >= 0 && floatValue <= 100)
											}
											onValueChange={(v) => field.onChange(v.value)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
