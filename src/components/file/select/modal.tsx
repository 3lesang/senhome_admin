import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { FileType } from "@/types/file";
import SelectModalGrid from "./grid";

interface FileModalProps {
	open: boolean;
	value?: FileType[];
	mode?: "single" | "multiple";
	onOpenChange: (open: boolean) => void;
	onConfirm?: (files: FileType[]) => void;
}

export default function FileModal(props: FileModalProps) {
	const { open, onOpenChange, onConfirm, mode } = props;

	const [selectedFiles, setSelectedFiles] = useState<Record<string, FileType>>(
		{},
	);

	const handleAdd = (file: FileType) => {
		setSelectedFiles((prev) => {
			if (mode === "single") return { [file.id]: file };
			return { ...prev, [file.id]: file };
		});
	};

	const handleRemove = (id: string) => {
		setSelectedFiles((prev) => {
			const { [id]: _, ...rest } = prev;
			return rest;
		});
	};

	const handleConfirm = () => {
		onConfirm?.(Object.values(selectedFiles));
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-5xl">
				<DialogHeader>
					<DialogTitle>Chọn tệp</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<SelectModalGrid
					onSelect={handleAdd}
					onRemove={handleRemove}
					selected={Object.keys(selectedFiles)}
				/>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Hủy</Button>
					</DialogClose>
					<Button type="button" onClick={handleConfirm}>
						Xác nhận
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
