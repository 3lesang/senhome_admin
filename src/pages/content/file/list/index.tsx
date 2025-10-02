import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import UploadModal from "@/components/file-upload/modal";
import TablePagination, {
	type TablePaginationDataChange,
} from "@/components/table-pagination";
import TableTabs from "@/components/table-tabs";
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
import { createFileHandler } from "@/handlers/file/mutation/create";
import { getListFileQueryOptions } from "@/handlers/file/query/list";
import { convertToFileUrl } from "@/lib/utils";
import FileItem from "./file-item";

const tabs = [{ label: "Tất cả file", q: "" }];

export default function FileListPage() {
	const navigate = useNavigate();
	const { page, limit, q } = useSearch({ from: "/(app)/content/files/" });
	const { data, refetch } = useSuspenseQuery(
		getListFileQueryOptions({ page, limit, query: q }),
	);

	const handlePaginationChange = ({
		limit,
		page,
	}: TablePaginationDataChange) => {
		navigate({ to: "/content/files", search: { page: page, limit: limit } });
	};

	const handleTabChange = (q: string) => {
		navigate({ to: "/content/files", search: { page: 1, limit: limit, q } });
	};

	const { mutate } = useMutation({
		mutationFn: createFileHandler,
		onSuccess: () => {
			refetch();
		},
	});

	const handleUpload = (files: File[]) => {
		mutate(files);
	};

	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Quản lý danh sách files</CardTitle>
				<CardDescription>
					Những hình ảnh tải lên ở đây có thể được thêm cho sản phẩm, nhóm sản
					phẩm, trang và các bài blog.
				</CardDescription>
				<CardAction>
					<UploadModal onConfirm={handleUpload} />
				</CardAction>
			</CardHeader>
			<CardContent>
				<Card className="border-0 shadow-none">
					<CardHeader>
						<CardTitle>
							<TableTabs data={tabs} q={q} onChange={handleTabChange} />
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
					<CardContent>
						<div className="grid grid-cols-10 gap-1">
							{data?.items?.map((item) => (
								<FileItem
									key={item.id}
									data={{ id: item.id, url: convertToFileUrl(item) ?? "" }}
								/>
							))}
						</div>
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
