import { ImagePlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";

type FileType = {
	id: string;
	url: string;
};

interface VariantImageInputProps {
	value?: FileType | null;
	onChange?: (data: FileType | null) => void;
}

export function VariantImageInput({ value, onChange }: VariantImageInputProps) {
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
			<div className="size-14 rounded-md overflow-hidden relative">
				<img src={file.url} alt="" className="w-full h-full object-cover" />
				<Button
					type="button"
					variant="outline"
					size="icon-sm"
					className="absolute top-1 right-1 size-6 rounded-full"
					onClick={handleRemove}
				>
					<XIcon />
				</Button>
			</div>
		);
	}
	return (
		<div className="flex justify-center items-center size-14 rounded-md bg-neutral-50/10 border border-dashed relative">
			<ImagePlusIcon size={16} />
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
