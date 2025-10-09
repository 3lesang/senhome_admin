import { XIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ProductItemType = { id: string; thumbnail: string; name: string };

interface ProductSelectItemProps {
	data: ProductItemType;
	onRemove?: (value: string) => void;
}

export default function ProductSelectItem({
	data,
	onRemove,
}: ProductSelectItemProps) {
	const [hide, setHide] = useState(false);

	function handleRemove() {
		onRemove?.(data.id);
		setHide(true);
	}

	if (hide) return null;

	return (
		<div
			className={cn(
				buttonVariants({ variant: "ghost" }),
				"justify-start w-full h-10",
			)}
		>
			<Avatar className="rounded">
				<AvatarImage src={data.thumbnail} />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>
			<p className="text-sm line-clamp-1">{data.name}</p>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="ml-auto"
				onClick={handleRemove}
			>
				<XIcon />
			</Button>
		</div>
	);
}
