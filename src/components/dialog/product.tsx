import type { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { getListProductQueryOptions } from "@/api/product/list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { convertToFileUrl } from "@/lib/utils";

export type ListProductDialogDataType = {
	id: string;
	name: string;
	thumbnail: string;
};

interface ListProductDialogProps {
	children: ReactNode;
	onConfirm?: (value: Record<string, ListProductDialogDataType>) => void;
}

export default function ListProductDialog({
	onConfirm,
	children,
}: ListProductDialogProps) {
	const [value, setValue] = useState<Record<string, ListProductDialogDataType>>(
		{},
	);

	const { data } = useQuery(
		getListProductQueryOptions({ page: 1, limit: 10, query: "" }),
	);

	const handleCheck = (
		checked: CheckedState,
		data: ListProductDialogDataType,
	) => {
		if (checked.valueOf()) {
			setValue((prev) => ({ ...prev, [data.id]: data }));
		} else {
			setValue((prev) => {
				const { [data.id]: _, ...rest } = prev;
				return rest;
			});
		}
	};

	const handleConfirm = () => {
		onConfirm?.(value);
		setValue({});
	};

	const handleCancel = () => {
		setValue({});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chọn sản phẩm</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<div className="flex gap-2">
					<Input placeholder="Tìm kiếm sản phẩm"></Input>
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
				<Separator />
				<ScrollArea className="-mx-6 h-96">
					{data?.items.map((item) => (
						<Label key={item.id} className="px-6 py-3 rounded hover:bg-gray-50">
							<Checkbox
								id={item.id}
								onCheckedChange={(checked) =>
									handleCheck(checked, {
										id: item.id,
										thumbnail: convertToFileUrl(item.expand.thumbnail),
										name: item.name,
									})
								}
							/>
							<Avatar className="rounded">
								<AvatarImage src={convertToFileUrl(item.expand.thumbnail)} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<p>{item.name}</p>
						</Label>
					))}
				</ScrollArea>
				<Separator />
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline" onClick={handleCancel}>
							Hủy
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button type="button" onClick={handleConfirm}>
							Chọn
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
