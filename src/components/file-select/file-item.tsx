import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { FileType } from "@/types/file";

interface FileItemProps {
	isSelected?: boolean;
	data: FileType;
	onSelect?: (data: FileType) => void;
	onRemove?: (id: string) => void;
}

function FileItem({
	data,
	onRemove,
	onSelect,
	isSelected = false,
}: FileItemProps) {
	const [selected, setSelected] = useState(isSelected);
	const { id, url } = data;

	const handleClick = () => {
		if (selected) {
			onRemove?.(id);
		} else {
			onSelect?.(data);
		}
		setSelected((prev) => !prev);
	};
	return (
		<div className="relative group">
			<button
				type="button"
				className="absolute inset-0 z-50"
				onClick={handleClick}
			></button>
			<div
				className={cn(
					"group-hover:bg-gray-50 rounded-md p-4",
					selected && "bg-gray-50",
				)}
			>
				<img
					src={url}
					alt=""
					className="object-contain aspect-square rounded-md"
				/>
			</div>
			<Checkbox
				checked={selected}
				type="button"
				className="absolute right-2 top-2 bg-white"
			/>
		</div>
	);
}

export default FileItem;
