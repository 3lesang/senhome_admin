import { XIcon } from "lucide-react";
import { useState } from "react";
import ListProductDialog, {
	type ListProductDialogDataType,
} from "@/components/dialog/product";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function CollectionProduct() {
	const [data, setData] = useState<Record<string, ListProductDialogDataType>>(
		{},
	);

	const handleConfirm = (value: Record<string, ListProductDialogDataType>) => {
		const next = { ...data, ...value };
		setData(next);
	};

	const handleRemove = (id: string) => {
		const { [id]: _, ...rest } = data;
		setData(rest);
	};

	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Sản phẩm</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
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
				<Separator className="my-2" />
				<div>
					{Object.values(data)?.map((item, index) => (
						<div
							key={item.id}
							className={cn(
								buttonVariants({ variant: "ghost" }),
								"justify-start w-full h-10",
							)}
						>
							<p>{index + 1}</p>
							<Avatar className="rounded">
								<AvatarImage src={item.thumbnail} />
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<p className="text-sm line-clamp-1">{item.name}</p>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="ml-auto"
								onClick={() => handleRemove(item.id)}
							>
								<XIcon />
							</Button>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
