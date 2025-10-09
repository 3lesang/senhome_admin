import { useState } from "react";
import ListProductDialog, {
	type ListProductDialogDataType,
} from "@/components/dialog/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ProductSelectItem from "./item";

interface CollectionProductSelectProps {
	onChange?: (value: string[]) => void;
}

export default function CollectionProductSelect({
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

	const handleRemove = (id: string) => {
		const { [id]: _, ...rest } = data;
		const keys = Object.keys(rest);
		onChange?.(keys);
		setData(rest);
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
					<ProductSelectItem
						key={item.id}
						data={item}
						onRemove={handleRemove}
					/>
				))}
			</div>
		</div>
	);
}
