import type { CheckedState } from "@radix-ui/react-checkbox";
import { useSuspenseQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { getCollectionsQueryOptions } from "@/api/collection/list";
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

interface Collection {
	id: string;
	name: string;
}

interface CollectionInputProps {
	value?: Collection[];
	onChange?: (value: Collection[]) => void;
}

export function CollectionInput({ value, onChange }: CollectionInputProps) {
	const [selected, setSelected] = useState<Collection[]>(value ?? []);

	const { data: collections } = useSuspenseQuery(
		getCollectionsQueryOptions({ page: 1, limit: 10, query: "" }),
	);

	function handleSelect(checked: CheckedState, item: Collection) {
		let updated: Collection[];
		if (!checked) {
			updated = selected.filter((i) => i.id !== item.id);
		} else {
			updated = [...selected, item];
		}
		setSelected(updated);
		onChange?.(updated);
	}

	function handleRemove(id: string) {
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
						Collection
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					{collections.items.map((item: Collection) => {
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
						{item.name}
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
