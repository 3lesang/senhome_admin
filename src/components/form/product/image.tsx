import { ImagePlusIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { FileDialog } from "@/components/dialog/file";
import { Button } from "@/components/ui/button";
import { FilePreview } from "@/components/file-preview";
import { convertToFileUrl } from "@/lib/utils";

interface VariantImageInputProps {
	value?: string;
	onChange?: (data: string) => void;
}

export function VariantImageInput({
	value = "",
	onChange,
}: VariantImageInputProps) {
	const [file, setFile] = useState<string>(value);

	function handleConfirm(files: string[]) {
		const [file] = files;
		setFile(file);
		onChange?.(file);
	}

	function handleRemove() {
		setFile("");
		onChange?.("");
	}

	if (file) {
		return (
			<div className="size-14 rounded-md overflow-hidden relative bg-neutral-50">
				<FilePreview
					render={() => {
						return (
							<img
								src={convertToFileUrl(file)}
								alt=""
								className="object-contain"
							/>
						);
					}}
				>
					<img
						src={convertToFileUrl(file)}
						alt=""
						className="w-full h-full object-contain cursor-pointer"
					/>
				</FilePreview>
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
			<FileDialog value={file ? [file] : []} onConfirm={handleConfirm}>
				<button type="button" className="absolute inset-0" />
			</FileDialog>
		</div>
	);
}
