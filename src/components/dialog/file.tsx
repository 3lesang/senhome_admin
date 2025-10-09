import { useInfiniteQuery } from "@tanstack/react-query";
import { type ReactNode, useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useIntersectionObserver } from "usehooks-ts";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { convertToFileUrl } from "@/lib/utils";
import pocketClient from "@/pocketbase/client";
import { FILE_COLLECTION } from "@/pocketbase/constants";

interface FileDialogProps {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	value: { id: string; url: string }[];
	onConfirm?: (data: { id: string; url: string }[]) => void;
	multiple?: boolean;
	children?: ReactNode;
}

type FormType = {
	files: { id: string; url: string }[];
};

export function FileDialog({
	value,
	open,
	onOpenChange,
	onConfirm,
	multiple,
	children,
}: FileDialogProps) {
	const form = useForm<FormType>({
		defaultValues: { files: value },
		values: open ? { files: value } : undefined,
	});

	const { append, remove, replace, fields } = useFieldArray({
		control: form.control,
		name: "files",
		keyName: "key",
	});

	const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: [FILE_COLLECTION],
		queryFn: async ({ pageParam }) =>
			pocketClient
				.collection<{ id: string; collectionName: string; file: string }>(
					FILE_COLLECTION,
				)
				.getList(pageParam, 20, { sort: "-created" }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
	});

	const handleConfirm = () => {
		onConfirm?.(form.getValues("files"));
	};

	const handleCancel = () => {
		form.reset({ files: [] });
	};

	const isSelected = (id: string) =>
		form.getValues("files").some((f) => f.id === id);

	useEffect(() => {
		if (isIntersecting && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [isIntersecting, isFetchingNextPage, fetchNextPage]);

	const renderFileItem = (item: {
		id: string;
		collectionName: string;
		file: string;
	}) => {
		const selected = isSelected(item.id);

		if (!multiple) {
			return (
				<Label
					key={item.id}
					className="aspect-square bg-neutral-50 relative rounded-md overflow-hidden border cursor-pointer"
				>
					<img
						src={convertToFileUrl(item)}
						alt=""
						className="object-contain h-full w-full"
					/>
					<RadioGroupItem
						value={item.id}
						className="absolute top-1 right-1 bg-white"
					/>
				</Label>
			);
		}

		return (
			<Label
				key={item.id}
				className="aspect-square bg-neutral-50 relative rounded-md overflow-hidden border cursor-pointer"
			>
				<img
					src={convertToFileUrl(item)}
					alt=""
					className="object-contain h-full w-full"
				/>
				<Checkbox
					defaultChecked={selected}
					onCheckedChange={(checked) => {
						const current = form.getValues("files");
						const index = current.findIndex((f) => f.id === item.id);

						if (checked) {
							if (index === -1)
								append({
									id: item.id,
									url: convertToFileUrl(item) ?? "",
								});
						} else if (index !== -1) {
							remove(index);
						}
					}}
					className="absolute top-1 right-1 bg-white"
				/>
			</Label>
		);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{children && <DialogTrigger asChild>{children}</DialogTrigger>}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chọn tệp</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>

				<div className="max-h-96 overflow-scroll">
					{multiple ? (
						<div className="grid grid-cols-5 gap-1 min-h-96">
							{data?.pages.flatMap((page) =>
								page.items.map((item) => renderFileItem(item)),
							)}
						</div>
					) : (
						<RadioGroup
							value={form.getValues("files")[0]?.id ?? ""}
							onValueChange={(id) => {
								const item = data?.pages
									.flatMap((p) => p.items)
									.find((it) => it.id === id);
								if (item) {
									replace([
										{
											id: item.id,
											url: convertToFileUrl(item) ?? "",
										},
									]);
								}
							}}
							className="grid grid-cols-5 gap-1 min-h-96"
						>
							{data?.pages.flatMap((page) =>
								page.items.map((item) => renderFileItem(item)),
							)}
						</RadioGroup>
					)}

					<div ref={ref} className="flex justify-center items-center h-8">
						{isFetchingNextPage && <Spinner />}
					</div>
				</div>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline" onClick={handleCancel}>
							Hủy
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							type="button"
							onClick={handleConfirm}
							disabled={fields.length === 0}
						>
							Xác nhận
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
