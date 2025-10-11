import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { EditIcon, ListFilterIcon, SearchIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { deleteProductsHandler } from "@/api/product/delete";
import { getListProductQueryOptions } from "@/api/product/list";
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
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Spinner } from "@/components/ui/spinner";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn, convertToFileUrl } from "@/lib/utils";

type FormValues = {
	ids: { value: string }[];
};

function getStatusLabel(status: "active" | "draft") {
	return {
		active: "Hoạt động",
		draft: "Bản nháp",
	}[status];
}

export function ProductListPage() {
	const navigate = useNavigate();
	const { page, limit, query } = useSearch({ from: "/(app)/products/" });

	const form = useForm<FormValues>({
		defaultValues: { ids: [] },
	});
	const { control } = form;

	const { fields, append, remove } = useFieldArray({
		control,
		name: "ids",
	});

	const selectedIds = useWatch({ control, name: "ids" });

	const { data, refetch } = useSuspenseQuery(
		getListProductQueryOptions({ page, limit, query }),
	);

	const { mutate, isPending } = useMutation({
		mutationFn: deleteProductsHandler,
		onSuccess: () => {
			remove();
			refetch();
		},
	});

	const handlePaginationChange = ({
		page,
		limit,
	}: TablePaginationDataChange) => {
		navigate({ to: "/products", search: { page, limit } });
	};

	const handleTabChange = (query: string) => {
		navigate({ to: "/products", search: { page: 1, limit, query } });
	};

	const toggleSelect = (id: string, checked: boolean) => {
		const index = fields.findIndex((f) => f.value === id);
		if (checked && index === -1) append({ value: id });
		if (!checked && index !== -1) remove(index);
	};

	const handleBulkDelete = () => {
		if (selectedIds.length === 0) return;
		mutate(selectedIds.map((i) => i.value));
	};

	const allChecked =
		data.items.length > 0 && fields.length === data.items.length;

	const isIndeterminate = fields.length > 0 && !allChecked;

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý sản phẩm</CardTitle>
				<CardDescription>Danh sách sản phẩm</CardDescription>
				<CardAction className="flex gap-2 items-center">
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
								onChange={handleTabChange}
								value={query}
							/>
						</CardTitle>
						<CardDescription>
							<Badge variant="secondary">{data.totalItems} sản phẩm</Badge>
						</CardDescription>
						<CardAction className="flex items-center gap-2">
							{selectedIds.length > 0 && (
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
							)}
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
									<Checkbox
										checked={isIndeterminate ? "indeterminate" : allChecked}
										onCheckedChange={(checked) => {
											if (checked) {
												data.items.forEach((item) => {
													if (!fields.find((f) => f.value === item.id)) {
														append({ value: item.id });
													}
												});
											} else {
												remove();
											}
										}}
									/>
								</TableHead>
								<TableHead></TableHead>
								<TableHead>Tên sản phẩm</TableHead>
								<TableHead>Trạng thái</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{data.items.map((item) => {
								const isSelected = fields.some((f) => f.value === item.id);
								return (
									<ContextMenu key={item.id}>
										<ContextMenuTrigger asChild>
											<TableRow>
												<TableCell className="text-center">
													<Checkbox
														checked={isSelected}
														onCheckedChange={(checked) =>
															toggleSelect(item.id, !!checked)
														}
													/>
												</TableCell>
												<TableCell className="w-8">
													<Avatar className="rounded">
														<AvatarImage
															src={convertToFileUrl(item.expand.thumbnail)}
														/>
														<AvatarFallback className="rounded" />
													</Avatar>
												</TableCell>
												<TableCell className="min-w-96 max-w-96">
													<Link
														to="/products/$id"
														params={{ id: item.id }}
														className="hover:underline"
													>
														{item.name}
													</Link>
												</TableCell>
												<TableCell>
													{item.status && (
														<Badge variant="secondary">
															{getStatusLabel(item.status)}
														</Badge>
													)}
												</TableCell>
											</TableRow>
										</ContextMenuTrigger>

										<ContextMenuContent>
											<ContextMenuItem asChild>
												<Link
													to="/products/$id"
													params={{ id: item.id }}
													className="flex items-center gap-2"
												>
													<EditIcon />
													Chỉnh sửa
												</Link>
											</ContextMenuItem>
											<ContextMenuItem onClick={() => mutate([item.id])}>
												<Trash2Icon />
												Xóa
											</ContextMenuItem>
										</ContextMenuContent>
									</ContextMenu>
								);
							})}
						</TableBody>
					</Table>

					<CardFooter>
						<TablePagination
							page={page}
							limit={limit}
							total={data.totalItems}
							onChange={handlePaginationChange}
						/>
					</CardFooter>
				</Card>
			</CardContent>
		</Card>
	);
}
