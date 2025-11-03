import { DeleteObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { InfoIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { TabsButton } from "@/components/table/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getFilesQueryOptions } from "@/queries/file";
import { s3Client } from "@/s3";

export function FilesPage() {
	const { page, limit, query } = useSearch({ from: "/(app)/content/file/" });

	const { data, refetch } = useSuspenseQuery(
		getFilesQueryOptions({ page, limit, query }),
	);

	const createMutation = useMutation({
		mutationFn: (value: FileList) => {
			return Promise.all(
				Array.from(value).map((f) => {
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
			refetch();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (value: string[]) => {
			return s3Client.send(
				new DeleteObjectsCommand({
					Bucket: "r2-bucket",
					Delete: {
						Objects: value.map((i) => ({ Key: i })),
					},
				}),
			);
		},
		onSuccess() {
			toast.success("Delete successfully");
			refetch();
		},
	});

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý danh sách files</CardTitle>
				<CardDescription>
					Những hình ảnh tải lên ở đây có thể được thêm cho sản phẩm, nhóm sản
					phẩm, trang và các bài blog.
				</CardDescription>
				<CardAction>
					<Label className={cn(buttonVariants())}>
						<input
							type="file"
							className="hidden"
							multiple
							onChange={(e) => {
								const files = e.target.files;
								if (!files?.length) return;
								createMutation.mutateAsync(files);
							}}
						/>
						Tải lên
					</Label>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TabsButton
								tabs={[{ label: "Tất cả", value: "" }]}
								value={query}
							/>
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
						{data?.Contents?.map((item) => (
							<ContextMenu key={item.Key}>
								<ContextMenuTrigger>
									<div className="rounded-md border overflow-hidden bg-neutral-50">
										<img
											src={`https://bucket.senhome.vn/${item.Key}`}
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
											item.Key && deleteMutation.mutateAsync([item.Key])
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
						{/*<TablePagination
							page={page}
							limit={limit}
							total={data?.totalItems ?? 0}
							onChange={handlePaginationChange}
						/>*/}
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
