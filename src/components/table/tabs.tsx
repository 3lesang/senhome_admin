import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TabsButtonProps {
	onChange?: (value: string) => void;
	tabs: { label: string; value: string }[];
	value: string;
}

export function TabsButton({ onChange, tabs, value }: TabsButtonProps) {
	const [tab, setTab] = useState(value);

	useEffect(() => {
		setTab(value);
	}, [value]);

	return (
		<div className="flex items-center gap-2">
			{tabs.map((item) => (
				<Button
					key={item.value}
					type="button"
					variant="ghost"
					onClick={() => {
						setTab(value);
						onChange?.(value);
					}}
					className={cn(item.value === tab && "bg-gray-100")}
				>
					{item.label}
				</Button>
			))}
		</div>
	);
}
