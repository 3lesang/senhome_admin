import type { CheckedState } from "@radix-ui/react-checkbox";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { badgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { getCollectionsQueryOptions } from "@/queries/collection";

interface Collection {
	id: number;
	name: string;
}

interface CollectionInputProps {
	value?: Collection[] | null;
	onChange?: (value: Collection[]) => void;
}

export function CollectionInput({ value, onChange }: CollectionInputProps) {
	const [selected, setSelected] = useState<Collection[]>(value ?? []);

	const { data: collections } = useQuery(
		getCollectionsQueryOptions({ page: 1, limit: 10, query: "" }),
	);

	function handleSelect(checked: CheckedState, item: Collection) {
		let updated: Collection[];
		if (!checked) {
			updated = selected.filter((i) => i.id !== item.id);
		} else {
			updated = [...selected, { ...item, id: item.id }];
		}
		setSelected(updated);
		onChange?.(updated);
	}

	function handleRemove(id: number) {
		const updated = selected.filter((i) => i.id !== id);
		setSelected(updated);
		onChange?.(updated);
	}

	return (
		<div className="">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						className="w-full justify-between"
					>
						Chọn nhóm sản phẩm
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					{collections?.data?.data?.map((item) => {
						const checked = selected.some((s) => s.id === item.id);
						return (
							<Label
								key={item.id}
								className={cn(
									buttonVariants({ variant: "ghost" }),
									"w-full justify-start",
								)}
							>
								<Checkbox
									defaultChecked={checked}
									onCheckedChange={(checked) => handleSelect(checked, item)}
								/>
								{item.name}
							</Label>
						);
					})}
				</PopoverContent>
			</Popover>
			<div className="space-x-1">
				{selected.map((item) => (
					<div
						key={item.id}
						className={cn(badgeVariants({ variant: "secondary" }))}
					>
						<Link
							to="/product/collection/$id"
							params={{ id: item.id.toString() }}
							className="hover:underline"
						>
							{item.name}
						</Link>
						<Button
							variant="ghost"
							size="icon"
							className="size-4"
							onClick={() => handleRemove(item.id)}
						>
							<XIcon />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
