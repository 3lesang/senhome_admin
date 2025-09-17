import { SquareIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFileList } from "@/stores/file";
import PageListEmpty from "./empty";
import PageListGrid from "./grid";
import ListPagePagination from "./pagination";
import DeleteAction from "./toolbar/delete-action";

export default function ListPageBody() {
	const { data, isLoading, hasSelect, setHasSelect } = useFileList();

	if (isLoading) return null;
	if (Number(data?.totalItems) === 0 && !isLoading) return <PageListEmpty />;

	return (
		<div className="max-w-7xl mx-auto pb-16">
			<div className="flex items-center justify-between">
				<div>
					<Badge variant="secondary">{data?.totalItems} file</Badge>
				</div>
				<div className="flex gap-1 items-center">
					<DeleteAction />
					<Button
						variant="ghost"
						className={cn(hasSelect && "bg-gray-100")}
						onClick={() => setHasSelect?.(!hasSelect)}
					>
						{hasSelect && <SquareIcon />}
						Lựa chọn
					</Button>
				</div>
			</div>
			<div className="my-4">
				<PageListGrid />
			</div>
			<ListPagePagination />
		</div>
	);
}
