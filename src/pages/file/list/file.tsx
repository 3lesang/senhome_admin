import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useFileList } from "@/stores/file";

interface MediaFileProps {
	data?: {
		id?: string;
		url?: string;
	};
}

export default function MediaFile({ data = { id: "" } }: MediaFileProps) {
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
				className="object-cover aspect-square w-full select-none"
				aria-label="image"
				alt=""
			></img>
			{hasSelect && (
				<button
					type="button"
					className={cn(
						"absolute inset-0 hover:cursor-pointer",
						isSelected ? "bg-black/20" : "bg-black/10",
					)}
					onClick={handleSelect}
				>
					<Checkbox
						className="absolute top-1 right-1 bg-white"
						checked={isSelected}
					/>
				</button>
			)}
		</div>
	);
}
