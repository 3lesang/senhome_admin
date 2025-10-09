import { XIcon } from "lucide-react";
import { useState } from "react";
import ListProductDialog, {
	type ListProductDialogDataType,
} from "@/components/dialog/product";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CollectionProductSelectProps {
	onChange?: (value: string[]) => void;
}

export function CollectionProductSelect({
	onChange,
}: CollectionProductSelectProps) {
	const [data, setData] = useState<Record<string, ListProductDialogDataType>>(
		{},
	);

	const handleConfirm = (value: Record<string, ListProductDialogDataType>) => {
		const next = { ...data, ...value };
		const keys = Object.keys(next);
		onChange?.(keys);
		setData(next);
	};

	return (
		<div className="space-y-4">
			<div className="flex gap-4">
				<div className="flex items-center gap-2 flex-1">
					<Input className="" placeholder="Tìm kiếm" />
					<ListProductDialog onConfirm={handleConfirm}>
						<Button type="button" variant="outline">
							Chọn sản phẩm
						</Button>
					</ListProductDialog>
				</div>
				<Select>
					<SelectTrigger className="w-64">
						<SelectValue placeholder="Sắp xếp" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				{Object.values(data)?.map((item) => (
					<div
						key={item.id}
						className={cn(
							buttonVariants({ variant: "ghost" }),
							"justify-start w-full h-10",
						)}
					>
						<Avatar className="rounded">
							{/*<AvatarImage src={data.thumbnail} />*/}
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<p className="text-sm line-clamp-1">{item.name}</p>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="ml-auto"
						>
							<XIcon />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
