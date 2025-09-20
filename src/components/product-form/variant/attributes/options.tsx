import { PlusIcon } from "lucide-react";
import { nanoid } from "nanoid";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { OptionsType, OptionType } from "@/types/product";
import OptionInput from "./option-input";

interface AttributeOptionsProps {
	data?: OptionsType;
	onChange?: (data: OptionsType) => void;
}

function AttributeOptions({ data = {}, onChange }: AttributeOptionsProps) {
	const [options, setOptions] = useState<OptionsType>(data);

	const handleAdd = () => {
		const id = nanoid(4);
		const next: OptionsType = {
			...options,
			[id]: { id, name: "", status: "new" },
		};
		setOptions(next);
		onChange?.(next);
	};

	const handleRemove = (id: string) => {
		const option = options[id];
		if (option?.id) {
			const next: OptionsType = {
				...options,
				[id]: {
					id: option.id,
					name: option.name,
					status: "removed",
				},
			};
			setOptions(next);
			onChange?.(next);
		}
	};

	const handleUpdate = (option: OptionType) => {
		const existing = options[option.id];
		const status = existing?.status === "new" ? "new" : "updated";
		const next: OptionsType = {
			...options,
			[option.id]: {
				...option,
				status,
			},
		};
		setOptions(next);
		onChange?.(next);
	};

	return (
		<div className="grid w-full items-center gap-3">
			<Label>Tùy chọn</Label>
			<div className="grid grid-cols-2 gap-4">
				{Object.entries(options).map(([id, opt]) => (
					<OptionInput
						key={id}
						value={opt}
						onRemove={handleRemove}
						onChange={handleUpdate}
					/>
				))}
				<Button type="button" variant="outline" onClick={handleAdd}>
					<PlusIcon />
					Thêm tùy chọn
				</Button>
			</div>
		</div>
	);
}

export default React.memo(AttributeOptions);
