import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
	CheckIcon,
	InfoIcon,
	ListFilterIcon,
	SearchIcon,
	Trash2Icon,
	XIcon,
} from "lucide-react";
import { Activity, useState } from "react";
import { createFileHandler } from "@/api/file/create";
import { deleteFilesHandler } from "@/api/file/delete";
import { getListFileQueryOptions } from "@/api/file/list";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
import { Badge } from "@/components/ui/badge";
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
import { Spinner } from "@/components/ui/spinner";
import { cn, convertToFileUrl } from "@/lib/utils";

export function FileListPage() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [files, setFiles] = useState<FileList | null>(null);

	const { page, limit, query } = useSearch({ from: "/(app)/content/files/" });
	const { data, refetch } = useSuspenseQuery(
		getListFileQueryOptions({ page, limit, query }),
	);

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/content/files", search: { page: page, limit: limit } });
	};

	const handleTabChange = (query: string) => {
		navigate({
			to: "/content/files",
			search: { page: 1, limit: limit, query },
		});
	};

	const { mutate: createMutate, isPending } = useMutation({
		mutationFn: createFileHandler,
		onSuccess() {
			refetch();
		},
	});

	const { mutate: deleteMutate } = useMutation({
		mutationFn: deleteFilesHandler,
		onSuccess() {
			refetch();
		},
	});

	function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
		const files = event.target.files;
		setFiles(files);
		setOpen(true);
		files && createMutate(files);
	}

	function handleRemove(ids: string[]) {
		deleteMutate(ids);
	}

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			{open && (
				<div className="fixed bottom-8 right-8 rounded-md bg-neutral-950 text-white px-4 py-2 shadow w-80 space-y-4">
					<Activity mode={isPending ? "visible" : "hidden"}>
						{files &&
							Array.from(files).map((item) => (
								<div className="flex items-center gap-1 w-full" key={item.name}>
									<img
										src={URL.createObjectURL(item)}
										alt=""
										className="size-8 rounded"
									/>
									<p className="w-full line-clamp-1">{item.name}</p>
									<div>
										<Spinner />
									</div>
								</div>
							))}
					</Activity>
					<Activity mode={!isPending ? "visible" : "hidden"}>
						<div className="flex items-center">
							<CheckIcon className="size-4 mr-2" />
							<p className="flex-1">Tập tin đã được tải lên</p>
							<Button
								type="button"
								size="icon-sm"
								variant="ghost"
								onClick={() => setOpen(false)}
							>
								<XIcon />
							</Button>
						</div>
					</Activity>
				</div>
			)}
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
							onChange={handleFileChange}
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
								onChange={handleTabChange}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">{data?.totalItems} file</Badge>
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
						{data?.items?.map((item) => (
							<ContextMenu key={item.id}>
								<ContextMenuTrigger>
									<div className="rounded-md border overflow-hidden bg-neutral-50">
										<img
											src={convertToFileUrl(item)}
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
									<ContextMenuItem onClick={() => handleRemove([item.id])}>
										<Trash2Icon />
										Xóa
									</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
						))}
					</CardContent>
					<CardFooter>
						<TablePagination
							page={page}
							limit={limit}
							total={data?.totalItems ?? 0}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
