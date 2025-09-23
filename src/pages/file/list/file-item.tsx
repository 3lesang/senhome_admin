import { cn } from "@/lib/utils";
import { useFileList } from "@/stores/file";

interface FileItemProps {
	data?: {
		id?: string;
		url?: string;
	};
}

export default function FileItem({ data = { id: "" } }: FileItemProps) {
	const { hasSelect, setSelected, selected } = useFileList();
	const { id = "", url } = data;

	const isSelected = Boolean(selected?.[id]);

	const handleSelect = () => {
		if (id) {
			setSelected?.((prev) => ({ ...prev, [id]: !isSelected }));
		}
	};

	return (
		<div className="relative">
			<img
				src={url}
				className="object-contain aspect-square w-full select-none"
				aria-label="image"
				alt=""
			/>
			{hasSelect && (
				<button
					type="button"
					className="absolute inset-0 z-50"
					onClick={handleSelect}
				/>
			)}
			{hasSelect && (
				<div
					className={cn(
						"absolute inset-0",
						isSelected ? "bg-black/20" : "bg-black-10",
					)}
				></div>
			)}
		</div>
	);
}
