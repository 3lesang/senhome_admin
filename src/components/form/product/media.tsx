import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CloudIcon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

interface MediaInputProps {
	value?: string[] | null;
	onChange?: (value: string[]) => void;
}

interface SortableImageItemProps {
	id: string;
	index: number;
	onRemove: (index: number) => void;
}

function SortableImageItem({ id, index, onRemove }: SortableImageItemProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		zIndex: isDragging ? 50 : "auto",
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={cn(
				"relative aspect-square group",
				index === 0 ? "col-span-4 row-span-2" : "col-span-2",
			)}
		>
			<div
				className="w-full h-full rounded-md overflow-hidden cursor-grab active:cursor-grabbing bg-neutral-50"
				{...attributes}
				{...listeners}
			>
				<img
					src={`https://bucket.senhome.vn/${id}`}
					alt=""
					className="w-full h-full object-contain pointer-events-none"
				/>
			</div>

			<Button
				type="button"
				variant="outline"
				size="icon"
				className="absolute top-1 right-1 z-20 size-6 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition"
				onClick={(e) => {
					e.stopPropagation();
					onRemove(index);
				}}
			>
				<XIcon />
			</Button>
		</div>
	);
}

export function MediaInput({ value, onChange }: MediaInputProps) {
	const [files, setFiles] = useState<string[]>(() => value ?? []);

	const handleAdd = (newFiles: string[]) => {
		setFiles(newFiles);
		onChange?.(newFiles);
	};

	const handleRemove = (index: number) => {
		const updated = files.filter((_, i) => i !== index);
		setFiles(updated);
		onChange?.(updated);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (active.id !== over?.id) {
			const oldIndex = files.indexOf(active.id.toString());
			const newIndex = files.indexOf(over ? over.id.toString() : "");
			const reordered = arrayMove(files, oldIndex, newIndex);
			setFiles(reordered);
			onChange?.(reordered);
		}
	};

	if (!files.length)
		return (
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<CloudIcon />
					</EmptyMedia>
					<EmptyTitle>Chưa có hình ảnh nào</EmptyTitle>
					<EmptyDescription>
						Hãy tải lên tệp để lưu trữ và truy cập chúng ở bất kỳ đâu.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Button type="button">Tải lên</Button>
						<FileDialog value={files} multiple onConfirm={handleAdd}>
							<Button type="button" variant="outline">
								Chọn ảnh
							</Button>
						</FileDialog>
					</div>
				</EmptyContent>
			</Empty>
		);

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={files} strategy={verticalListSortingStrategy}>
				<div className="grid grid-cols-12 gap-1">
					{files.map((item, index) => (
						<SortableImageItem
							key={item}
							id={item}
							index={index}
							onRemove={handleRemove}
						/>
					))}
					<FileDialog value={files} multiple onConfirm={handleAdd}>
						<button
							type="button"
							className="col-span-2 border border-dashed flex justify-center items-center rounded-md bg-neutral-50/20 aspect-square"
						>
							<PlusIcon size={16} />
						</button>
					</FileDialog>
				</div>
			</SortableContext>
		</DndContext>
	);
}
