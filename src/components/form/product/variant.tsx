import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, XIcon } from "lucide-react";
import { type Ref, useEffect, useImperativeHandle } from "react";
import {
	type UseFormReturn,
	useFieldArray,
	useForm,
	useWatch,
} from "react-hook-form";
import { NumericFormat } from "react-number-format";
import z from "zod";
import { FileInput } from "@/components/input/file";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
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
import { OptionField } from "./options";

const schema = z.object({
	options: z
		.array(
			z.object({
				id: z.string(),
				name: z.string().min(1, "Name is required"),
				values: z
					.array(
						z.object({
							id: z.string(),
							name: z.string().min(1, "Value name is required"),
						}),
					)
					.superRefine((values, ctx) => {
						const seen = new Map<string, number[]>();
						values.forEach((v, i) => {
							const key = v.name.trim().toLowerCase();
							if (!key) return;
							if (seen.has(key)) {
								seen.get(key)?.push(i);
							} else {
								seen.set(key, [i]);
							}
						});
						for (const [_, indexes] of seen.entries()) {
							if (indexes.length > 1) {
								indexes.forEach((i) => {
									ctx.addIssue({
										code: "custom",
										message: "This value name already exists",
										path: [i, "name"],
									});
								});
							}
						}
					}),
			}),
		)
		.superRefine((values, ctx) => {
			const seen = new Map<string, number[]>();
			values.forEach((v, i) => {
				const key = v.name.trim().toLowerCase();
				if (!key) return;
				if (seen.has(key)) {
					seen.get(key)?.push(i);
				} else {
					seen.set(key, [i]);
				}
			});
			for (const [_, indexes] of seen.entries()) {
				if (indexes.length > 1) {
					indexes.forEach((i) => {
						ctx.addIssue({
							code: "custom",
							message: "This value name already exists",
							path: [i, "name"],
						});
					});
				}
			}
		}),
	variants: z.array(
		z.object({
			id: z.string(),
			price: z.number().min(0, "Price is required"),
			sale_price: z.number(),
			stock: z.number().min(0),
			sku: z.string(),
			file: z
				.object({
					id: z.string(),
					url: z.string(),
				})
				.nullable(),
			combos: z.string(),
		}),
	),
});

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

export type ProductVariantFormValuesType = z.infer<typeof schema>;

interface ProductVariantFormProps {
	ref?: Ref<UseFormReturn<ProductVariantFormValuesType>>;
	defaultValues?: ProductVariantFormValuesType;
}

export function ProductVariantForm({
	ref,
	defaultValues,
}: ProductVariantFormProps) {
	const form = useForm<ProductVariantFormValuesType>({
		resolver: zodResolver(schema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			options: defaultValues?.options ?? [],
			variants: defaultValues?.variants ?? [],
		},
	});

	useImperativeHandle(ref, () => form);

	const {
		fields: optionFields,
		append: appendOption,
		remove: removeOption,
	} = useFieldArray({ control: form.control, keyName: "key", name: "options" });

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

	return (
		<div className="space-y-4">
			{optionFields.map((field, index) => (
				<Card key={field.key} className="border-0 shadow-none p-0">
					<CardHeader className="p-0">
						<CardAction>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => removeOption(index)}
							>
								<XIcon />
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent className="space-y-4 p-0">
						<FormField
							control={form.control}
							name={`options.${index}.name`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thuộc tính</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="vd: kích thước, màu sắc,..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<OptionField optionIndex={index} form={form} />
					</CardContent>
				</Card>
			))}
			<Button
				variant="ghost"
				type="button"
				onClick={() =>
					appendOption({
						id: "",
						name: "",
						values: [{ name: "", id: "" }],
					})
				}
			>
				<PlusIcon />
				Thêm thuộc tính khác
			</Button>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Biến thể</TableHead>
						<TableHead>Giá</TableHead>
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
													<FileInput {...field} />
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
								<Badge variant="secondary">-20%</Badge>
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
		</div>
	);
}
