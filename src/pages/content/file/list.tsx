import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { InfoIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { getListFileQueryOptions } from "@/api/file/list";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
import { Badge } from "@/components/ui/badge";
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
import { convertToFileUrl } from "@/lib/utils";

export function FileListPage() {
	const navigate = useNavigate();
	const { page, limit, query } = useSearch({ from: "/(app)/content/files/" });
	const { data } = useSuspenseQuery(
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

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý danh sách files</CardTitle>
				<CardDescription>
					Những hình ảnh tải lên ở đây có thể được thêm cho sản phẩm, nhóm sản
					phẩm, trang và các bài blog.
				</CardDescription>
				<CardAction></CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TabsButton
								tabs={[{ label: "Tất cả file", value: "" }]}
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
									<ContextMenuItem>
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
