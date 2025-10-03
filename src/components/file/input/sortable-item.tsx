import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FileType } from "@/types/file";

function SortableItem({
	file,
	onRemove,
}: {
	file: FileType;
	onRemove: (id: string) => void;
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: file.id });

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="relative group aspect-square border rounded-lg overflow-hidden hover:cursor-move"
		>
			<img
				src={file.url}
				alt="preview"
				className="w-full h-full object-contain"
			/>
			<Button
				type="button"
				size="icon"
				className="hidden group-hover:flex absolute top-1 right-1 rounded-full bg-white/80 hover:bg-white size-6"
				variant="ghost"
				onClick={() => onRemove(file.id)}
			>
				<XIcon />
			</Button>
		</div>
	);
}

export default SortableItem;
