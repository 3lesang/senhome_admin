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
		<button
			type="button"
			className={cn(
				"p-4 hover:bg-gray-50 rounded-md",
				selected && "bg-gray-50",
			)}
			onClick={handleClick}
		>
			<div className="rounded-md border border-gray-100 p-1 bg-white">
				<div className="relative bg-gray-50 rounded-md">
					<img
						src={url}
						alt=""
						className="object-contain aspect-square rounded-md"
					/>
					<Checkbox
						checked={selected}
						type="button"
						className="absolute left-1 top-1 bg-white"
					/>
				</div>
			</div>
		</button>
	);
}

export default FileItem;
