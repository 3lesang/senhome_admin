import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext,
} from "@dnd-kit/sortable";
import { type ReactNode, useState } from "react";

import FileModal from "@/components/file-select/modal";
import type { FileType } from "@/types/file";
import SortableItem from "./sortable-item";

interface RenderDataProps {
	files: FileType[];
	handleRemove?: (id: string) => void;
	handleOpen?: () => void;
}

interface FileInputProps {
	value?: FileType[];
	mode?: "single" | "multiple";
	onChange?: (file: FileType[]) => void;
	render?: (data: RenderDataProps) => ReactNode;
}

function FileInput(props: FileInputProps) {
	const { value = [], mode = "multiple", onChange, render } = props;
	const [open, setOpen] = useState(false);
	const [files, setFiles] = useState<FileType[]>(value);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);

	const handleModalChange = (newFiles: FileType[]) => {
		setFiles(newFiles);
		onChange?.(newFiles);
		setOpen(false);
	};

	const handleRemoveFile = (id: string) => {
		const newFiles = files.filter((f) => f.id !== id);
		setFiles(newFiles);
		onChange?.(newFiles);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = files.findIndex((f) => f.id === active.id);
			const newIndex = files.findIndex((f) => f.id === over.id);
			const newFiles = arrayMove(files, oldIndex, newIndex);
			onChange?.(newFiles);
			setFiles(newFiles);
		}
	};

	const handleOpen = () => setOpen(true);

	return (
		<>
			{mode === "multiple" && (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={files.map((f) => f.id)}
						strategy={rectSortingStrategy}
					>
						<div className="grid grid-cols-8 gap-2 w-full">
							{files.map((file) => (
								<SortableItem
									key={file.id}
									file={file}
									onRemove={handleRemoveFile}
								/>
							))}
							{render?.({
								files,
								handleRemove: handleRemoveFile,
								handleOpen,
							})}
						</div>
					</SortableContext>
				</DndContext>
			)}

			{mode === "single" &&
				render?.({
					files,
					handleRemove: handleRemoveFile,
					handleOpen,
				})}

			<FileModal
				value={files}
				open={open}
				onOpenChange={setOpen}
				onConfirm={handleModalChange}
				mode={mode}
			/>
		</>
	);
}

export default FileInput;
