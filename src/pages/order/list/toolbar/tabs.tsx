import { useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useOrderList } from "@/stores/order";

const FILTERS = [
	{ key: 0, label: "Tất cả", query: "" },
	{ key: 1, label: "Đơn mới", query: `status="created"` },
	{ key: 3, label: "Đã hoàn thành", query: `status="completed"` },
	{ key: 4, label: "Đã hủy", query: `status="canceled"` },
];

export default function ListPageTabs() {
	const search = useSearch({ from: "/(app)/order/" });
	const { setQuery } = useOrderList();
	const [type, setType] = useState<number>(0);

	const handleFilterClick = (key: number, filterQuery: string) => {
		setType(key);
		setQuery(filterQuery);
	};

	useEffect(() => {
		if (search.q === "new") {
			setType(1);
			setQuery(`status="created"`);
		} else {
			setType(0);
			setQuery("");
		}
	}, [search.q, setQuery]);

	return (
		<div className="space-y-4">
			<div className="flex">
				{FILTERS.map((filter) => (
					<Button
						key={filter.key}
						type="button"
						variant="ghost"
						onClick={() => handleFilterClick(filter.key, filter.query)}
						className={cn(type === filter.key && "bg-gray-100")}
					>
						{filter.label}
					</Button>
				))}
			</div>
		</div>
	);
}
