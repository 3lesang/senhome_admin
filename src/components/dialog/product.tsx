import { useQuery } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, convertToFileUrl } from "@/lib/utils";
import { getProductsQueryOptions } from "@/queries/product";

type ProductDataType = {
	id: number;
	name: string;
	file: string;
};

interface ProductDialogProps {
	value?: ProductDataType[];
	onConfirm?: (value: ProductDataType[]) => void;
	children: ReactNode;
}

export function ProductDialog({
	value: initialValue = [],
	onConfirm,
	children,
}: ProductDialogProps) {
	const [value, setValue] = useState<ProductDataType[]>(initialValue);
	const [query, setQuery] = useState("");

	const { data } = useQuery(getProductsQueryOptions({ page: 1, size: 10 }));

	function handleToggle(item: ProductDataType) {
		setValue((prev) => {
			const exists = prev.some((p) => p.id === item.id);
			if (exists) return prev.filter((p) => p.id !== item.id);
			return [...prev, item];
		});
	}

	function handleConfirm() {
		onConfirm?.(value);
	}

	function handleCancel() {
		setValue(initialValue);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chọn sản phẩm</DialogTitle>
					<DialogDescription>
						Chọn một hoặc nhiều sản phẩm từ danh sách.
					</DialogDescription>
				</DialogHeader>
				<Input
					placeholder="Tìm kiếm sản phẩm..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<div className="space-y-2">
					{data?.data.data?.map((item) => {
						const selected = initialValue.some((v) => v.id === item.id);
						return (
							<Label
								key={item.id}
								className={cn(
									buttonVariants({ variant: "ghost" }),
									"w-full justify-start whitespace-normal",
								)}
							>
								<Checkbox
									defaultChecked={selected}
									onCheckedChange={() =>
										handleToggle({
											id: item.id ?? 0,
											name: item.name ?? "",
											file: item.file ?? "",
										})
									}
								/>
								<Avatar className="rounded-md">
									<AvatarImage src={convertToFileUrl(item.file)} />
									<AvatarFallback>SP</AvatarFallback>
								</Avatar>
								<span className="line-clamp-1">{item.name}</span>
							</Label>
						);
					})}
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline" onClick={handleCancel}>
							Hủy bỏ
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="button" onClick={handleConfirm}>
							Xác nhận
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
