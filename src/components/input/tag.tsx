import { XIcon } from "lucide-react";
import { useState } from "react";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

interface TagInputProps {
	value?: string;
	onChange?: (value: string) => void;
}

export function TagInput({ value, onChange }: TagInputProps) {
	const [tags, setTags] = useState<string[]>(() =>
		value ? value.split(",") : [],
	);

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			e.preventDefault();
			const inputValue = e.currentTarget.value.trim();
			if (!inputValue) return;
			const newTags = tags.includes(inputValue) ? tags : [inputValue, ...tags];
			onChange?.(newTags.join(","));
			setTags(newTags);
			e.currentTarget.value = "";
		}
	}

	function handleRemove(tag: string) {
		const newTags = tags.filter((t) => t !== tag);
		onChange?.(newTags.join(","));
		setTags(newTags);
	}

	return (
		<div className="space-y-0.5 space-x-2">
			<InputGroup>
				<InputGroupInput placeholder="Gắn thẻ" onKeyDown={handleKeyDown} />
				<InputGroupAddon align="inline-end">
					<Kbd>Enter</Kbd>
				</InputGroupAddon>
			</InputGroup>
			{tags.map((t) => (
				<div key={t} className={cn(badgeVariants({ variant: "secondary" }))}>
					{t}
					<Button
						type="button"
						size="icon"
						variant="ghost"
						className="size-4"
						onClick={() => handleRemove(t)}
					>
						<XIcon />
					</Button>
				</div>
			))}
		</div>
	);
}
