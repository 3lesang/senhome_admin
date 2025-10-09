import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import {
	type Ref,
	type RefObject,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import { type UseFormReturn, useFieldArray, useForm } from "react-hook-form";
import { useDebounceValue, useOnClickOutside } from "usehooks-ts";
import z from "zod";
import { badgeVariants } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import pocketClient from "@/pocketbase/client";
import { COLLECTION_COLLECTION } from "@/pocketbase/constants";

const schema = z.object({
	collections: z.array(z.object({ id: z.string(), name: z.string() })),
});

export type ProductCollectionFormValuesType = z.infer<typeof schema>;

interface ProductCollectionFormProps {
	ref?: Ref<UseFormReturn<ProductCollectionFormValuesType>>;
	defaultValues?: ProductCollectionFormValuesType;
}

export function ProductCollectionForm({
	ref,
	defaultValues,
}: ProductCollectionFormProps) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useDebounceValue("", 500);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const { data, isLoading } = useQuery({
		queryKey: [COLLECTION_COLLECTION, search],
		queryFn: () =>
			pocketClient
				.collection<{ id: string; name: string }>(COLLECTION_COLLECTION)
				.getList(1, 10, { filter: `name~"${search}"` }),
	});

	const form = useForm<ProductCollectionFormValuesType>({
		resolver: zodResolver(schema),
		defaultValues: {
			collections: defaultValues?.collections ?? [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "collections",
		keyName: "key",
	});

	useOnClickOutside(dropdownRef as RefObject<HTMLElement>, () =>
		setOpen(false),
	);
	useImperativeHandle(ref, () => form);

	return (
		<div>
			<div ref={dropdownRef} className="relative">
				<Input
					onFocus={() => setOpen(true)}
					onChange={(e) => setSearch(e.currentTarget.value)}
				/>
				{open && (
					<div className="absolute end-0 start-0 z-50">
						<div className="bg-white shadow border mt-2 rounded-md p-2">
							{isLoading && (
								<div className="flex justify-center items-center w-full h-16">
									<Spinner />
								</div>
							)}
							<ScrollArea className="max-h-56">
								{data?.items.map((item) => {
									const index = fields.findIndex((i) => i.id === item.id);
									const isExist = index !== -1;
									return (
										<Label
											key={item.id}
											className={cn(
												buttonVariants({ variant: "ghost" }),
												"w-full justify-start",
											)}
										>
											<Checkbox
												defaultChecked={isExist}
												onCheckedChange={(checked) => {
													if (checked) {
														if (isExist) return;
														append({ id: item.id, name: item.name });
													} else {
														remove(index);
													}
												}}
											/>
											{item.name}
										</Label>
									);
								})}
							</ScrollArea>
						</div>
					</div>
				)}
			</div>
			<div className="space-x-2">
				{fields.map((item, index) => (
					<Link
						key={item.key}
						to="/products/collections/$id"
						params={{ id: item.id }}
						className={cn(badgeVariants({ variant: "secondary" }))}
					>
						{item.name}
						<Button
							type="button"
							variant="secondary"
							size="icon"
							className="size-4"
							onClick={(e) => {
								e.preventDefault();
								remove(index);
							}}
						>
							<XIcon />
						</Button>
					</Link>
				))}
			</div>
		</div>
	);
}
