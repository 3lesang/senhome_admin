import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { FormValues } from "@/pages/product/update";

type OptionValuesProps = {
	optionIndex: number;
	form: UseFormReturn<FormValues>;
};

export function OptionValues({ optionIndex, form }: OptionValuesProps) {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `options.${optionIndex}.values`,
		keyName: "key",
	});

	function handleAdd() {
		append({ id: "", name: "" });
	}

	function handleRemove(index: number) {
		remove(index);
	}

	return (
		<div className="grid grid-cols-2 gap-1">
			{fields.map((item, index) => (
				<FormField
					key={item.key}
					control={form.control}
					name={`options.${optionIndex}.values.${index}.name`}
					render={({ field }) => (
						<FormItem>
							<div className="flex gap-1">
								<Button
									data-swapy-handle
									type="button"
									variant="ghost"
									size="icon"
								>
									<GripVerticalIcon />
								</Button>
								<FormControl>
									<Input placeholder="Thêm giá trị mới" {...field} />
								</FormControl>
								<Button
									type="button"
									size="icon"
									variant="ghost"
									onClick={() => handleRemove(index)}
								>
									<Trash2Icon />
								</Button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			))}
			<Button type="button" variant="outline" onClick={handleAdd}>
				Thêm giá trị mới
			</Button>
		</div>
	);
}
