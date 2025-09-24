import { useId } from "react";
import { DynamicPagination } from "@/components/dynamic-pagination";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export interface TablePaginationDataChange {
	limit: number;
	page: number;
}

interface TablePaginationProps {
	page: number;
	limit: number;
	total: number;
	onChange?: (data: TablePaginationDataChange) => void;
}

export default function TablePagination({
	page,
	limit,
	total,
	onChange,
}: TablePaginationProps) {
	const id = useId();
	const handleLimitChange = (val: string) => {
		onChange?.({ limit: Number(val), page: 1 });
	};

	const handlePageChange = (page: number) => {
		onChange?.({ limit, page });
	};

	return (
		<div className="flex justify-between w-full">
			<div className="flex w-full max-w-sm items-center gap-4">
				<Label htmlFor={id} className="whitespace-nowrap">
					Hiển thị
				</Label>
				<Select value={limit.toString()} onValueChange={handleLimitChange}>
					<SelectTrigger id={id} className="bg-white w-[120px]">
						<SelectValue placeholder="Chọn số lượng" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="10">10</SelectItem>
						<SelectItem value="20">20</SelectItem>
						<SelectItem value="40">40</SelectItem>
						<SelectItem value="50">50</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div>
				<DynamicPagination
					page={page}
					totalItems={total}
					perPage={limit}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}
