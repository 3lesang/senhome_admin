import { useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface CollectionConditionInputProps {
	value?: string;
	onChange?: (value: string) => void;
}

const FIELDS = {
	tag: "Nhãn",
};

const OPERATORS = {
	"~": "chứa",
};

export function CollectionConditionInput({
	value,
	onChange,
}: CollectionConditionInputProps) {
	const [field, operator, keyword] = useMemo(() => {
		const match = value?.match(/^([^~]+)(~)(.*)$/);
		return match ? [match[1], match[2], match[3]] : ["tag", "~", ""];
	}, [value]);

	const handleFieldChange = (newField: string) => {
		onChange?.(`${newField}${operator}${keyword}`);
	};

	const handleOperatorChange = (newOp: string) => {
		onChange?.(`${field}${newOp}${keyword}`);
	};

	const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(`${field}${operator}${e.target.value}`);
	};

	return (
		<div className="flex gap-2">
			<Select value={field} onValueChange={handleFieldChange}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Chọn trường" />
				</SelectTrigger>
				<SelectContent>
					{Object.entries(FIELDS).map(([key, label]) => (
						<SelectItem key={key} value={key}>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Select value={operator} onValueChange={handleOperatorChange}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Toán tử" />
				</SelectTrigger>
				<SelectContent>
					{Object.entries(OPERATORS).map(([key, label]) => (
						<SelectItem key={key} value={key}>
							{label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<Input className="w-full" onChange={handleKeywordChange} />
		</div>
	);
}
