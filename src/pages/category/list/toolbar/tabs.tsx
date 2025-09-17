import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FILTERS = [{ key: 0, label: "Tất cả", query: "" }];

export default function ListPageTabs() {
	const [type] = useState<number>(0);

	return (
		<div className="space-y-4">
			<div className="flex">
				{FILTERS.map((filter) => (
					<Button
						key={filter.key}
						type="button"
						variant="ghost"
						className={cn(type === filter.key && "bg-gray-100")}
					>
						{filter.label}
					</Button>
				))}
			</div>
		</div>
	);
}
