import { PlusIcon, XIcon } from "lucide-react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
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
import type { FormValues } from "@/pages/product/update";
import { OptionValues } from "./values";

type ProductOptionsProps = {
	form: UseFormReturn<FormValues>;
};

export function ProductOptions({ form }: ProductOptionsProps) {
	const {
		fields: optionFields,
		append: appendOption,
		remove: removeOption,
	} = useFieldArray({ control: form.control, keyName: "key", name: "options" });

	function handleAddOption() {
		appendOption({
			id: "",
			name: "",
			values: [{ name: "", id: "" }],
		});
	}
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
						<OptionValues optionIndex={index} form={form} />
					</CardContent>
				</Card>
			))}
			<Button variant="ghost" type="button" onClick={handleAddOption}>
				<PlusIcon />
				Thêm thuộc tính khác
			</Button>
		</div>
	);
}
