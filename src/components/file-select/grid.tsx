import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import FileDropzone from "@/components/file-dropzone";
import { createFileHandler } from "@/handlers/file/mutation/create";
import { convertToFileUrl } from "@/lib/utils";
import { FILE_COLLECTION } from "@/pocketbase/constants";
import { getListFilePocket } from "@/pocketbase/file/list";
import type { FileType } from "@/types/file";
import Dropzone from "./dropzone";
import FileItem from "./file-item";

interface SelectModalGridProps {
	onSelect?: (data: FileType) => void;
	onRemove?: (id: string) => void;
	selected?: string[];
}

const LIMIT = 20;

function SelectModalGrid({
	onRemove,
	onSelect,
	selected,
}: SelectModalGridProps) {
	const { isIntersecting, ref } = useIntersectionObserver({
		threshold: 0.5,
	});

	const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
		{
			queryKey: [FILE_COLLECTION],
			queryFn: async ({ pageParam }) => {
				return getListFilePocket({ page: pageParam, limit: LIMIT, filter: "" });
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				if (lastPage.page < lastPage.totalPages) {
					return lastPage.page + 1;
				}
				return undefined;
			},
		},
	);

	const { mutate } = useMutation({
		mutationFn: createFileHandler,
		onSuccess: () => {
			refetch();
		},
	});

	const handleUpload = (files: File[]) => {
		mutate(files);
	};

	useEffect(() => {
		if (isIntersecting && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [isIntersecting, isFetchingNextPage, fetchNextPage]);

	return (
		<div className="max-h-[500px] overflow-y-auto">
			<FileDropzone
				onChange={handleUpload}
				render={({ isDragActive }) => <Dropzone isDragActive={isDragActive} />}
			/>
			<div className="grid grid-cols-6 gap-2">
				{data?.pages.map((page) => {
					return page.items.map((item) => {
						const file: FileType = {
							id: item.id,
							url: convertToFileUrl(item) ?? "",
						};
						return (
							<FileItem
								key={item.id}
								data={file}
								onRemove={onRemove}
								onSelect={onSelect}
								isSelected={selected?.includes(item.id)}
							/>
						);
					});
				})}
			</div>
			<div ref={ref}></div>
		</div>
	);
}

export default SelectModalGrid;
