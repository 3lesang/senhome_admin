import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
	files?: File[];
	onRemove?: (name: string) => void;
}

function UploadPreview({ files, onRemove }: FilePreviewProps) {
	return (
		<ul className="grid grid-cols-8 gap-1">
			{files?.map((file) => (
				<li key={file.name} className="text-sm relative group">
					{file.type.startsWith("image/") && (
						<img
							src={URL.createObjectURL(file)}
							alt={file.name}
							className="w-full aspect-square rounded object-cover"
						/>
					)}
					<span className="line-clamp-1 truncate">{file.name}</span>
					<Button
						size="icon"
						variant="outline"
						className="absolute top-0 right-0 size-6 rounded-full opacity-0 group-hover:opacity-100"
						onClick={() => onRemove?.(file.name)}
					>
						<X className="h-4 w-4" />
					</Button>
				</li>
			))}
		</ul>
	);
}

export default UploadPreview;
