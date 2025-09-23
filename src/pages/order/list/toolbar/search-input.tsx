import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchInput({
	onSearch,
}: {
	onSearch?: (q: string) => void;
}) {
	const [open, setOpen] = useState(true);
	const [query, setQuery] = useState("");

	const debouncedSearch = useDebounceCallback((value: string) => {
		if (onSearch) {
			onSearch(value);
		}
	}, 500);

	return (
		<div className="flex gap-2 items-center">
			<Button
				size="icon"
				variant="outline"
				onClick={() => setOpen((prev) => !prev)}
			>
				<SearchIcon />
			</Button>

			{open && (
				<Input
					placeholder="Tìm kiếm..."
					className="bg-white w-56"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						debouncedSearch(e.target.value);
					}}
				/>
			)}
		</div>
	);
}
