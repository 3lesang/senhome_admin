import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TableTableDataType = {
	label: string;
	q: string;
};

interface ProductTabsProps {
	onChange?: (q: string) => void;
	data: TableTableDataType[];
	q: string;
}

export default function TableTabs({ onChange, data, q }: ProductTabsProps) {
	const [query, setQuery] = useState(q);

	const handleClick = (q: string) => {
		setQuery(q);
		onChange?.(q);
	};

	const checkActive = (q: string) => {
		return query === q;
	};

	useEffect(() => {
		setQuery(q);
	}, [q]);

	return (
		<div className="flex items-center gap-2">
			{data.map((item) => (
				<Button
					key={item.q}
					type="button"
					variant="ghost"
					onClick={() => handleClick(item.q)}
					className={cn(checkActive(item.q) && "bg-gray-100")}
				>
					{item.label}
				</Button>
			))}
		</div>
	);
}
