import { useInfiniteQuery } from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
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

export function FileDialog({
	value,
	open,
	onOpenChange,
	onConfirm,
	multiple,
	children,
}: FileDialogProps) {
	const [selectedFiles, setSelectedFiles] =
		useState<{ id: string; url: string }[]>(value);

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

	const isSelected = (id: string) => selectedFiles.some((f) => f.id === id);

	function handleToggle(item: {
		id: string;
		collectionName: string;
		file: string;
	}) {
		const fileObj = { id: item.id, url: convertToFileUrl(item) ?? "" };

		setSelectedFiles((prev) => {
			const exists = prev.some((f) => f.id === item.id);

			if (multiple) {
				if (exists) return prev.filter((f) => f.id !== item.id);
				return [...prev, fileObj];
			}

			if (exists) return [];
			return [fileObj];
		});
	}

	function handleConfirm() {
		onConfirm?.(selectedFiles);
	}

	function handleCancel() {
		setSelectedFiles([]);
	}

	useEffect(() => {
		setSelectedFiles(value);
	}, [value]);

	useEffect(() => {
		if (isIntersecting && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [isIntersecting, isFetchingNextPage, fetchNextPage]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			{children && <DialogTrigger asChild>{children}</DialogTrigger>}

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Chọn tệp</DialogTitle>
					<DialogDescription />
				</DialogHeader>

				<div className="max-h-96 overflow-scroll">
					<div className="grid grid-cols-5 gap-1 min-h-96">
						{data?.pages.flatMap((page) =>
							page.items.map((item) => {
								const selected = isSelected(item.id);
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
											checked={selected}
											onCheckedChange={() => handleToggle(item)}
											className="absolute top-1 right-1 bg-white"
										/>
									</Label>
								);
							}),
						)}
					</div>

					<div ref={ref} className="flex justify-center items-center h-16">
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
							disabled={selectedFiles.length === 0}
						>
							Xác nhận
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
