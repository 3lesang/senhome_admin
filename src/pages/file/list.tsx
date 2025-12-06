import { DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { InfoIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import axiosClient from "@/axios";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Spinner } from "@/components/ui/spinner";
import { convertToFileUrl, encodeToAvif } from "@/lib/utils";
import { getFilesQueryOptions } from "@/queries/file";
import { s3Client } from "@/s3";

export function FilesPage() {
	const { page, limit } = useSearch({ from: "/(app)/contents/files/" });

	const [pagination, setPagination] = useState({
		page,
		limit,
	});
	const inputRef = useRef<HTMLInputElement>(null);
	const getFilesQuery = useQuery(
		getFilesQueryOptions({ page: pagination.page, limit: pagination.limit }),
	);

	const createMutation = useMutation({
		mutationFn: async (files: File[]) => {
			const fileNames = files.map((f) => `media/${f.name}`);
			axiosClient.post("/files", { names: fileNames });
			return Promise.all(
				files.map((f) => {
					const command = new PutObjectCommand({
						Bucket: "r2-bucket",
						Key: `media/${f.name}`,
						Body: f,
						ContentType: f.type,
					});
					return s3Client.send(command);
				}),
			);
		},
		onSuccess: () => {
			toast.success("Upload successfully");
			getFilesQuery.refetch();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (value: { names: string[]; ids: number[] }) => {
			axiosClient.delete("/files", { data: { ids: value.ids } });
			return s3Client.send(
				new DeleteObjectsCommand({
					Bucket: "r2-bucket",
					Delete: {
						Objects: value.names.map((i) => ({ Key: i })),
					},
				}),
			);
		},
		onSuccess() {
			toast.success("Delete successfully");
			getFilesQuery.refetch();
		},
	});

	function handlePaginationChange(data: TablePaginationDataChange) {
		setPagination(data);
	}

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý danh sách files</CardTitle>
				<CardDescription>
					Những hình ảnh tải lên ở đây có thể được thêm cho sản phẩm, nhóm sản
					phẩm, trang và các bài blog.
				</CardDescription>
				<CardAction>
					<input
						ref={inputRef}
						type="file"
						className="hidden"
						multiple
						onChange={async (e) => {
							const fileList = e.currentTarget.files ?? [];
							const files = Array.from(fileList);
							const avifFiles = await Promise.all(
								Array.from(files).map((f) => encodeToAvif(f)),
							);

							createMutation.mutateAsync(avifFiles);
						}}
					/>
					<Button
						type="button"
						disabled={createMutation.isPending}
						onClick={() => inputRef.current?.click()}
					>
						{createMutation.isPending && <Spinner />}
						<span>Tải lên</span>
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TabsButton tabs={[{ label: "Tất cả", value: "" }]} value="" />
						</CardTitle>
						<CardDescription>
							{/*<Badge variant="secondary">{data?.totalItems} file</Badge>*/}
						</CardDescription>
						<CardAction className="flex items-center gap-2">
							<Button variant="outline" size="icon">
								<SearchIcon />
							</Button>
							<Button variant="outline" size="icon">
								<ListFilterIcon />
							</Button>
						</CardAction>
					</CardHeader>
					<CardContent className="grid grid-cols-10 gap-1">
						{getFilesQuery.data?.data.data?.map((item) => (
							<ContextMenu key={item.id}>
								<ContextMenuTrigger>
									<div className="rounded-md border overflow-hidden bg-neutral-50">
										<img
											src={convertToFileUrl(item.name)}
											width={100}
											height={100}
											className="object-contain aspect-square w-full select-none"
											aria-label="image"
											loading="lazy"
											alt=""
										/>
									</div>
								</ContextMenuTrigger>
								<ContextMenuContent>
									<ContextMenuItem>
										<InfoIcon />
										Xem chi tiết
									</ContextMenuItem>
									<ContextMenuItem
										onClick={() =>
											deleteMutation.mutateAsync({
												names: [item.name],
												ids: [item.id],
											})
										}
									>
										<Trash2Icon />
										Xóa
									</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
						))}
					</CardContent>
					<CardFooter>
						<TablePagination
							page={pagination.page}
							limit={pagination.limit}
							total={getFilesQuery.data?.data.total_items ?? 0}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
