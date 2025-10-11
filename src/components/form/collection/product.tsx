import { Link } from "@tanstack/react-router";
import { PlusIcon, TagIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { ProductDialog } from "@/components/dialog/product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

type ProductDataType = {
	id: string;
	name: string;
	thumbnail: string;
};

interface CollectionProductInputProps {
	value?: ProductDataType[];
	onChange?: (value: ProductDataType[]) => void;
}

export function CollectionProductInput({
	value,
	onChange,
}: CollectionProductInputProps) {
	const [products, setProducts] = useState(value ?? []);

	function handleConfirm(value: ProductDataType[]) {
		onChange?.(value);
		setProducts(value);
	}

	function handleRemove(id: string) {
		const newProducts = products?.filter((p) => p.id !== id);
		onChange?.(newProducts);
		setProducts(newProducts);
	}

	if (!products?.length)
		return (
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<TagIcon />
					</EmptyMedia>
					<EmptyTitle>Chưa có sản phẩm nào</EmptyTitle>
					<EmptyDescription>
						Hãy bắt đầu bằng cách tạo sản phẩm đầu tiên của bạn.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<div className="flex gap-2">
						<Link to="/products/create" className={cn(buttonVariants())}>
							Tạo sản phẩm
						</Link>
						<ProductDialog value={products} onConfirm={handleConfirm}>
							<Button type="button" variant="outline">
								Chọn sản phẩm
							</Button>
						</ProductDialog>
					</div>
				</EmptyContent>
			</Empty>
		);

	return (
		<div className="space-y-1">
			{products.map((item) => (
				<Item key={item.id} size="sm" variant="muted">
					<ItemMedia>
						<Avatar className="rounded-md">
							<AvatarImage src={item.thumbnail} />
							<AvatarFallback>SP</AvatarFallback>
						</Avatar>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>{item.name}</ItemTitle>
					</ItemContent>
					<ItemActions>
						<Button
							type="button"
							size="icon-sm"
							variant="ghost"
							onClick={() => handleRemove(item.id)}
						>
							<XIcon />
						</Button>
					</ItemActions>
				</Item>
			))}
			<ProductDialog value={products} onConfirm={handleConfirm}>
				<Button type="button" variant="ghost">
					<PlusIcon />
					Add product
				</Button>
			</ProductDialog>
		</div>
	);
}
