import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PlusCircleIcon, XIcon } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
	const [openDialog, setOpenDialog] = useState(false);
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
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Nhóm sản phẩm</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				<div ref={dropdownRef} className="relative">
					<Input
						onFocus={() => setOpen(true)}
						onChange={(e) => setSearch(e.currentTarget.value)}
					/>
					{open && (
						<div className="absolute end-0 start-0 z-50">
							<div className="bg-white shadow border mt-2 rounded-md p-2">
								<Button
									type="button"
									variant="ghost"
									className="w-full justify-start"
									onClick={() => setOpenDialog(true)}
								>
									<PlusCircleIcon />
									Add new collection
								</Button>
								<Separator className="my-1" />
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

				<Dialog open={openDialog} onOpenChange={setOpenDialog}>
					<DialogContent className="bg-sidebar">
						<DialogHeader>
							<DialogTitle>Add collection</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<Separator />
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Discard
								</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button type="button">Save</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
				<div className="space-x-2">
					{fields.map((item, index) => (
						<Badge key={item.key} variant="secondary">
							{item.name}
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="size-4"
								onClick={() => remove(index)}
							>
								<XIcon />
							</Button>
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
