import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import {
	EditIcon,
	ListFilterIcon,
	MoreVerticalIcon,
	SearchIcon,
	StarIcon,
	Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import axiosClient from "@/axios";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table/pagination";
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn, convertToFileUrl } from "@/lib/utils";
import { getProductsQueryOptions } from "@/queries/product";

export function ProductListPage() {
	const { page, limit } = useSearch({ from: "/(app)/products/" });
	const [pagination, setPagination] = useState({
		page,
		limit,
	});
	const { data, refetch } = useSuspenseQuery(
		getProductsQueryOptions({ page: pagination.page, limit: pagination.limit }),
	);

	const deleteProductMutation = useMutation({
		mutationFn: (ids: number[]) => {
			return axiosClient.delete("/products", {
				data: { ids },
			});
		},
		onSuccess: () => {
			refetch();
		},
	});

	const handlePaginationChange = (value: TablePaginationDataChange) => {
		setPagination({ page: value.page, limit: value.limit });
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý sản phẩm</CardTitle>
				<CardDescription>Danh sách sản phẩm</CardDescription>
				<CardAction className="flex gap-2 items-center">
					<Link
						to="/categories"
						className={cn(buttonVariants({ variant: "secondary" }))}
					>
						Danh mục sản phẩm
					</Link>
					<Link to="/products/create" className={cn(buttonVariants())}>
						Tạo sản phẩm
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TabsButton
								tabs={[
									{ label: "Tất cả sản phẩm", value: "" },
									{ label: "Đang hoạt động", value: `status="active"` },
									{ label: "Bản nháp", value: `status="draft"` },
								]}
								value={""}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">{data.data.total_items} sản phẩm</Badge>
						</CardDescription>
						<CardAction className="flex items-center gap-2">
							{/*{selectedIds.length > 0 && (
								<Button variant="ghost" onClick={() => remove()}>
									Hủy bỏ
								</Button>
							)}
							{selectedIds.length > 0 && (
								<Button
									variant="outline"
									onClick={handleBulkDelete}
									disabled={isPending}
								>
									{isPending && <Spinner />}
									Xóa {selectedIds.length} sản phẩm
								</Button>
							)}*/}
							<Button variant="outline" size="icon">
								<SearchIcon />
							</Button>
							<Button variant="outline" size="icon">
								<ListFilterIcon />
							</Button>
						</CardAction>
					</CardHeader>
					<Table>
						<TableHeader className="bg-gray-50">
							<TableRow>
								<TableHead className="w-16 text-center">
									<Checkbox />
								</TableHead>
								<TableHead></TableHead>
								<TableHead>Tên sản phẩm</TableHead>
								<TableHead>Trạng thái</TableHead>
								<TableHead></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data?.data?.data?.map((item) => {
								return (
									<TableRow key={item.id}>
										<TableCell className="text-center">
											<Checkbox />
										</TableCell>
										<TableCell className="w-8">
											<Avatar className="rounded bg-neutral-50">
												{item.file && (
													<AvatarImage
														src={convertToFileUrl(item.file)}
														className="object-contain"
													/>
												)}
												<AvatarFallback className="rounded" />
											</Avatar>
										</TableCell>
										<TableCell className="min-w-96 max-w-96">
											<Link
												to="/products/$id/update"
												params={{ id: item.id.toString() }}
												className="hover:underline"
											>
												{item.name}
											</Link>
										</TableCell>
										<TableCell>
											<Badge variant="secondary">
												{item.is_active ? "Hoạt động" : "Bản nháp"}
											</Badge>
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button type="button" variant="ghost">
														<MoreVerticalIcon />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent>
													<DropdownMenuItem asChild>
														<Link
															to="/products/$id/update"
															params={{ id: item.id.toString() }}
															className="flex items-center gap-2"
														>
															<EditIcon />
															Chỉnh sửa
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem asChild>
														<Link
															to="/products/$id/reviews"
															params={{ id: item.id.toString() }}
															className="flex items-center gap-2"
														>
															<StarIcon />
															Đánh giá
														</Link>
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() =>
															deleteProductMutation.mutateAsync([item.id])
														}
													>
														<Trash2Icon />
														Xóa
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
					<CardFooter>
						<TablePagination
							page={page}
							limit={limit}
							total={data?.data?.total_items}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
