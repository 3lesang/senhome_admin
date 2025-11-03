import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import {
	Link,
	useNavigate,
	useParams,
	useSearch,
} from "@tanstack/react-router";
import {
	DatabaseIcon,
	ListFilterIcon,
	SearchIcon,
	StarIcon,
	Trash2Icon,
} from "lucide-react";
import { Activity } from "react";
import { deleteReviewsHandler } from "@/api/review/delete";
import { getReviewsProductQueryOptions } from "@/api/review/list";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function ListReviewPage() {
	const { id } = useParams({ from: "/(app)/product/$id/review/" });
	const navigate = useNavigate();
	const { page, limit } = useSearch({ from: "/(app)/product/$id/review/" });
	const { data: reviews, refetch } = useSuspenseQuery(
		getReviewsProductQueryOptions({ page, limit, productId: id }),
	);

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({
			to: "/product/$id/review",
			params: { id },
			search: { page: page, limit: limit },
		});
	};

	const { mutate } = useMutation({
		mutationFn: deleteReviewsHandler,
		onSuccess: () => {
			refetch();
		},
	});

	function handleRemove(ids: string[]) {
		mutate(ids);
	}

	return (
		<Card className="border-0 shadow-none max-w-6xl mx-auto bg-transparent">
			<CardHeader>
				<CardTitle>Quản lý đánh giá</CardTitle>
				<CardDescription>Danh sách đánh giá</CardDescription>
				<CardAction>
					<Link
						to="/product/$id/review/create"
						params={{ id }}
						type="button"
						className={cn(buttonVariants())}
					>
						Thêm đánh giá
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Activity mode={reviews.totalItems > 0 ? "visible" : "hidden"}>
					<Card className="border-0 shadow-none">
						<CardHeader>
							<CardTitle>
								<TabsButton tabs={[{ label: "Tất cả", value: "" }]} value="" />
							</CardTitle>
							<CardDescription>
								<Badge variant="secondary">{reviews.totalItems} đánh giá</Badge>
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
						<Table>
							<TableHeader className="bg-sidebar">
								<TableRow>
									<TableHead className="w-16 text-center">
										<Checkbox />
									</TableHead>
									<TableHead></TableHead>
									<TableHead>Đánh giá</TableHead>
									<TableHead>Nội dung</TableHead>
									<TableHead>Người dùng</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{reviews.items.map((item) => (
									<ContextMenu key={item.id}>
										<ContextMenuTrigger asChild>
											<TableRow>
												<TableCell className="w-16 text-center">
													<Checkbox />
												</TableCell>
												<TableCell></TableCell>
												<TableCell>
													<Badge variant="secondary">
														{item.rating}
														<StarIcon className="fill-primary" />
													</Badge>
												</TableCell>
												<TableCell className="whitespace-normal">
													<p className="line-clamp-1">{item.content}</p>
												</TableCell>
												<TableCell>
													<Badge variant="secondary">
														{item.expand.user.name}
													</Badge>
												</TableCell>
											</TableRow>
										</ContextMenuTrigger>
										<ContextMenuContent>
											<ContextMenuItem onClick={() => handleRemove([item.id])}>
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
								page={page}
								limit={limit}
								total={reviews.totalItems}
								onChange={handlePaginationChange}
							/>
						</CardFooter>
					</Card>
				</Activity>
				<Activity mode={reviews.totalItems === 0 ? "visible" : "hidden"}>
					<Empty>
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<DatabaseIcon />
							</EmptyMedia>
							<EmptyTitle>No data</EmptyTitle>
							<EmptyDescription>No data found</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Link
								to="/product/$id/review/create"
								params={{ id }}
								type="button"
								className={cn(buttonVariants())}
							>
								Thêm đánh giá
							</Link>
						</EmptyContent>
					</Empty>
				</Activity>
			</CardContent>
		</Card>
	);
}
