import { ImagePlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";

type FileType = {
	id: string;
	url: string;
};

interface CollectionImageInputProps {
	value?: FileType | null;
	onChange?: (data: FileType | null) => void;
}

export function CollectionImageInput({
	value,
	onChange,
}: CollectionImageInputProps) {
	const [open, setOpen] = useState(false);
	const [file, setFile] = useState<
		{ id: string; url: string } | null | undefined
	>(value);

	function handleConfirm(files: { id: string; url: string }[]) {
		const file = files?.[0];
		setFile(file);
		onChange?.(file);
	}

	function handleRemove() {
		setFile(null);
		onChange?.(null);
	}

	if (file?.id) {
		return (
			<div className="aspect-square w-full relative">
				<FileDialog
					value={file ? [file] : []}
					open={open}
					onOpenChange={setOpen}
					onConfirm={handleConfirm}
				>
					<img
						src={file.url}
						alt=""
						className="w-full h-full object-contain rounded-md bg-neutral-50/30"
					/>
				</FileDialog>
				<Button
					type="button"
					variant="outline"
					size="icon"
					className="absolute top-1 right-1 rounded-full"
					onClick={handleRemove}
				>
					<XIcon />
				</Button>
			</div>
		);
	}
	return (
		<div className="aspect-square w-full flex justify-center items-center rounded-md bg-neutral-50/10 border border-dashed relative">
			<ImagePlusIcon />
			<button
				type="button"
				className="absolute inset-0"
				onClick={() => setOpen(true)}
			/>
			<FileDialog
				value={file ? [file] : []}
				open={open}
				onOpenChange={setOpen}
				onConfirm={handleConfirm}
			/>
		</div>
	);
}
