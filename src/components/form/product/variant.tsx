import { useEffect } from "react";
import { type UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { VariantImageInput } from "@/components/form/product/image";
import { Badge } from "@/components/ui/badge";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { calculateDiscount } from "@/lib/utils";
import type { FormValues } from "@/pages/product/update";

interface ProductVariantProps {
	form: UseFormReturn<FormValues>;
}

function generateCombinations(options: { values: { name: string }[] }[]) {
	let result: string[][] = [[]];
	for (const opt of options) {
		if (!opt.values?.length) continue;
		const next: string[][] = [];
		for (const combo of result) {
			for (const val of opt.values) {
				const name = val.name.trim();
				if (name) next.push([...combo, name]);
			}
		}
		result = next;
	}

	if (result.length === 0 || result[0].length === 0) return [];
	return result.map((combo) => combo.join(","));
}

export function ProductVariant({ form }: ProductVariantProps) {
	const { fields: variantFields, replace: replaceVariants } = useFieldArray({
		control: form.control,
		name: "variants",
		keyName: "key",
	});

	const options = useWatch({ control: form.control, name: "options" });
	const { getValues } = form;

	useEffect(() => {
		const combos = generateCombinations(options);
		const existing = new Map(getValues("variants").map((v) => [v.combos, v]));

		const newVariants = combos.map((key) => {
			const variant = existing.get(key);
			return {
				id: variant?.id ?? "",
				price: variant?.price ?? 0,
				sale_price: variant?.sale_price ?? 0,
				stock: variant?.stock ?? 0,
				sku: variant?.sku ?? "",
				file: variant?.file ?? null,
				combos: variant?.combos ?? key,
			};
		});

		replaceVariants(newVariants);
	}, [options, getValues, replaceVariants]);

	if (!variantFields.length) return;

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Biến thể</TableHead>
					<TableHead>Giá gốc</TableHead>
					<TableHead>Giá bán</TableHead>
					<TableHead>Giảm giá</TableHead>
					<TableHead>Tồn kho</TableHead>
					<TableHead>SKU</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{variantFields.map((item, index) => (
					<TableRow key={item.key}>
						<TableCell>
							<div className="space-y-1">
								<FormField
									control={form.control}
									name={`variants.${index}.file`}
									render={({ field }) => (
										<FormItem>
											<FormControl>
												<VariantImageInput {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
								<div className="space-x-1">
									{item.combos.split(",").map((value) => (
										<Badge key={value} variant="secondary">
											{value}
										</Badge>
									))}
								</div>
							</div>
						</TableCell>
						<TableCell>
							<FormField
								control={form.control}
								name={`variants.${index}.price`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<NumericFormat
												className="bg-white"
												thousandSeparator
												prefix="đ "
												customInput={Input}
												inputMode="decimal"
												value={field.value}
												onValueChange={(values) =>
													field.onChange(Number(values.value))
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TableCell>
						<TableCell>
							<FormField
								control={form.control}
								name={`variants.${index}.sale_price`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<NumericFormat
												className="bg-white"
												thousandSeparator
												prefix="đ "
												customInput={Input}
												inputMode="decimal"
												value={field.value}
												onValueChange={(values) =>
													field.onChange(Number(values.value))
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TableCell>
						<TableCell>
							<Badge variant="secondary">
								{calculateDiscount(
									form.watch(`variants.${index}.price`),
									form.watch(`variants.${index}.sale_price`),
								)}
								%
							</Badge>
						</TableCell>
						<TableCell>
							<FormField
								control={form.control}
								name={`variants.${index}.stock`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<NumericFormat
												className="bg-white"
												thousandSeparator
												customInput={Input}
												inputMode="decimal"
												value={field.value}
												onValueChange={(values) =>
													field.onChange(Number(values.value))
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TableCell>
						<TableCell>
							<FormField
								control={form.control}
								name={`variants.${index}.sku`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input className="bg-white" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
