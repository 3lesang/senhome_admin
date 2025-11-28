import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import axiosClient from "@/axios";
import TablePagination from "@/components/table/pagination";
import { TabsButton } from "@/components/table/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn, convertToFileUrl } from "@/lib/utils";
import { getCollectionsQueryOptions } from "@/queries/collection";

export function CollectionListPage() {
	const { page, limit, query } = useSearch({
		from: "/(app)/products/collections/",
	});

	const getCollectionsQuery = useSuspenseQuery(
		getCollectionsQueryOptions({ page, limit, query }),
	);

	const deleteCollectionMutation = useMutation({
		mutationFn: (ids: number[]) =>
			axiosClient.delete("/collections", { data: { ids } }),
		onSuccess: () => {
			getCollectionsQuery.refetch();
		},
	});

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý nhóm sản phẩm</CardTitle>
				<CardDescription>
					Nhóm sản phẩm giúp quản lý sản phẩm và khách hàng tìm kiếm sản phẩm
					một cách dễ dàng.
				</CardDescription>
				<CardAction className="space-x-2">
					<Link
						to="/products/collections/album/create"
						className={cn(buttonVariants({ variant: "secondary" }))}
					>
						Tạo bộ sưu tập
					</Link>
					<Link
						to="/products/collections/create"
						className={cn(buttonVariants())}
					>
						Tạo nhóm sản phẩm
					</Link>
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
							<Badge variant="secondary">nhóm sản phẩm</Badge>
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
					<Table className="bg-white rounded-md">
						<TableHeader className="bg-sidebar">
							<TableRow>
								<TableHead className="w-16 text-center">
									<Checkbox />
								</TableHead>
								<TableHead></TableHead>
								<TableHead>Tên</TableHead>
								<TableHead>Ngày tạo</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{getCollectionsQuery?.data?.data.data?.map((item) => (
								<ContextMenu key={item.id}>
									<ContextMenuTrigger asChild>
										<TableRow>
											<TableCell className="text-center">
												<Checkbox />
											</TableCell>
											<TableCell className="w-8">
												<Avatar className="rounded overflow-hidden bg-neutral-50">
													<AvatarImage
														src={convertToFileUrl(item.file)}
														className="object-contain"
													/>
													<AvatarFallback className="rounded" />
												</Avatar>
											</TableCell>
											<TableCell>
												<Link
													to="/products/collections/$id"
													params={{ id: item?.id.toString() }}
													className="hover:underline"
												>
													{item?.name}
												</Link>
											</TableCell>
											<TableCell></TableCell>
										</TableRow>
									</ContextMenuTrigger>
									<ContextMenuContent>
										<Link
											to="/products/collections/$id"
											params={{ id: item?.id.toString() }}
										>
											<ContextMenuItem>
												<EditIcon />
												Chỉnh sửa
											</ContextMenuItem>
										</Link>

										<ContextMenuItem
											onClick={() =>
												deleteCollectionMutation.mutateAsync([item.id])
											}
										>
											<Trash2Icon />
											Xóa
										</ContextMenuItem>
									</ContextMenuContent>
								</ContextMenu>
							))}
						</TableBody>
					</Table>
					<CardFooter>
						<TablePagination
							total={getCollectionsQuery.data?.data.total_items}
							page={page}
							limit={limit}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
