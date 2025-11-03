import { ImagePlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";
import { convertToFileUrl } from "@/lib/utils";

interface CollectionImageInputProps {
	value?: string;
	onChange?: (data: string) => void;
}

export function CollectionImageInput({
	value,
	onChange,
}: CollectionImageInputProps) {
	const [file, setFile] = useState<string>(value ?? "");

	function handleConfirm(files: string[]) {
		const [file] = files;
		setFile(file);
		onChange?.(file);
	}

	function handleRemove() {
		setFile("");
		onChange?.("");
	}

	if (value) {
		return (
			<div className="aspect-square w-full relative">
				<FileDialog value={[file]} onConfirm={handleConfirm}>
					<img
						src={convertToFileUrl(file)}
						alt=""
						className="w-full h-full object-contain rounded-md bg-neutral-50/30"
					/>
				</FileDialog>
				<Button
					type="button"
					variant="outline"
					size="icon-sm"
					className="absolute top-2 right-2 rounded-full"
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
			<FileDialog value={[file]} onConfirm={handleConfirm}>
				<button type="button" className="absolute inset-0" />
			</FileDialog>
		</div>
	);
}
