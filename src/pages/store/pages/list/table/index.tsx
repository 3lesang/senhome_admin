import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { StorePageType } from "@/types/store";
import StorePageRow from "./row";

interface StorePageTableProps {
	data?: StorePageType[];
}

export default function StorePageTable({ data }: StorePageTableProps) {
	if (!data?.length)
		return (
			<p className="text-center text-sm text-gray-500">Chưa có chính sách</p>
		);
	return (
		<Table className="bg-white rounded-md">
			<TableHeader className="bg-sidebar">
				<TableRow>
					<TableHead>
						<Checkbox />
					</TableHead>
					<TableHead>Tên chính sách</TableHead>
					<TableHead>Ngày tạo</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.map((item) => (
					<StorePageRow key={item.id} data={item} />
				))}
			</TableBody>
		</Table>
	);
}
