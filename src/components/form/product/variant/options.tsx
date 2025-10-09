import { GripVerticalIcon, Trash2Icon } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { createSwapy, type SwapEndEvent, type Swapy } from "swapy";
import { Button } from "@/components/ui/button";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProductVariantFormValuesType } from ".";

type OptionFieldProps = {
	optionIndex: number;
	form: UseFormReturn<ProductVariantFormValuesType>;
};

export function OptionField({ optionIndex, form }: OptionFieldProps) {
	const swapy = useRef<Swapy>(null);
	const container = useRef(null);

	const { fields, append, remove, replace } = useFieldArray({
		control: form.control,
		name: `options.${optionIndex}.values`,
		keyName: "key",
	});

	const { getValues } = form;
	function handleAdd() {
		append({ id: "", name: "" });
		swapy.current?.update();
	}

	function handleRemove(index: number) {
		remove(index);
		swapy.current?.update();
	}

	const handleSwapEnd = useCallback(
		(event: SwapEndEvent) => {
			if (!event.hasChanged) return;
			const newOrder = event.slotItemMap.asArray.map(
				({ item }) => getValues(`options.${optionIndex}.values`)[Number(item)],
			);
			replace(newOrder);
			swapy.current?.update();
		},
		[replace, getValues, optionIndex],
	);

	useEffect(() => {
		if (container.current) {
			swapy.current = createSwapy(container.current);

			swapy.current.onSwapEnd(handleSwapEnd);
		}

		return () => {
			swapy.current?.destroy();
		};
	}, [handleSwapEnd]);

	return (
		<div className="grid w-full items-center gap-3">
			<Label>Giá trị</Label>
			<div ref={container} className="grid grid-cols-2 gap-2">
				{fields.map((item, index) => (
					<FormField
						key={item.key}
						control={form.control}
						name={`options.${optionIndex}.values.${index}.name`}
						render={({ field }) => (
							<FormItem>
								<div data-swapy-slot={index}>
									<div data-swapy-item={index} className="flex gap-1">
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
		</div>
	);
}
