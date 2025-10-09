import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, XIcon } from "lucide-react";
import {
	type ChangeEvent,
	type Ref,
	type RefObject,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { type UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import { useOnClickOutside } from "usehooks-ts";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const schema = z.object({
	tags: z.array(
		z.object({
			name: z.string(),
		}),
	),
});

export type ProductTagFormValuesType = z.infer<typeof schema>;

interface ProductTagFormProsp {
	ref?: Ref<UseFormReturn<ProductTagFormValuesType>>;
	defaultValues?: ProductTagFormValuesType;
}

export function ProductTagForm({ ref, defaultValues }: ProductTagFormProsp) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const [tags, setTags] = useState<{ name: string }[]>([]);
	const dropDownRef = useRef<HTMLDivElement | null>(null);

	const form = useForm<ProductTagFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues: {
			tags: defaultValues?.tags ?? [],
		},
	});

	const { fields, remove, append } = useFieldArray({
		control: form.control,
		name: "tags",
	});

	useImperativeHandle(ref, () => form);
	useOnClickOutside(dropDownRef as RefObject<HTMLElement>, () =>
		setOpen(false),
	);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setValue(value);
		setOpen(Boolean(value));
	};

	const handleFocus = () => {
		setOpen(Boolean(value));
	};

	const handleAdd = () => {
		append({ name: value });
		setTags((prev) => [...prev, { name: value }]);
		setValue("");
		setOpen(false);
	};

	const searchTags = tags.filter((item) => item.name.includes(value));

	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Nhãn</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<div ref={dropDownRef} className="relative">
					<Input value={value} onChange={handleChange} onFocus={handleFocus} />
					{open && (
						<div className="absolute end-0 start-0">
							<div className="bg-white shadow border p-2  rounded-md mt-1">
								{searchTags.length === 0 && (
									<Button
										type="button"
										variant="ghost"
										className="w-full justify-start"
										onClick={handleAdd}
									>
										<PlusCircleIcon />
										Add {value}
									</Button>
								)}
								{searchTags.map((item) => {
									const index = fields.findIndex((i) => i.name === item.name);
									const isExit = index !== -1;
									return (
										<Label
											key={item.name}
											className={cn(
												buttonVariants({ variant: "ghost" }),
												"w-full justify-start",
											)}
											htmlFor={item.name}
										>
											<Checkbox
												id={item.name}
												defaultChecked={isExit}
												onCheckedChange={(checked) => {
													if (checked) {
														if (isExit) return;
														append({ name: item.name });
													} else {
														remove(index);
													}
												}}
											/>
											{item.name}
										</Label>
									);
								})}
							</div>
						</div>
					)}
				</div>
				<div className="space-x-2">
					{fields.map((item, index) => (
						<Badge key={item.name} variant="secondary">
							{item.name}
							<Button
								type="button"
								size="icon"
								variant="ghost"
								className="size-4"
								onClick={() => remove(index)}
							>
								<XIcon className="size-4" />
							</Button>
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
