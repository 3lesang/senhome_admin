import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TableTableDataType = {
	label: string;
	q: string;
};

interface ProductTabsProps {
	onChange?: (q: string) => void;
	data: TableTableDataType[];
}

export default function TableTabs({ onChange, data }: ProductTabsProps) {
	const [idx, setIdx] = useState<number>(0);

	const handleClick = (index: number, q: string) => {
		setIdx(index);
		onChange?.(q);
	};

	return (
		<div className="flex items-center gap-2">
			{data.map((item, index) => (
				<Button
					key={item.q}
					type="button"
					variant="ghost"
					onClick={() => handleClick(index, item.q)}
					className={cn(idx === index && "bg-gray-100")}
				>
					{item.label}
				</Button>
			))}
		</div>
	);
}
