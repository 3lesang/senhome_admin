import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { CategoryDataType } from "@/types/category";
import CategoryRow from "./row";

interface CategoryTableProps {
	data?: CategoryDataType[];
}

export default function CategoryTable(props: CategoryTableProps) {
	const { data = [] } = props;
	return (
		<Table className="bg-white rounded-md">
			<TableHeader className="bg-sidebar">
				<TableRow>
					<TableHead>
						<Checkbox />
					</TableHead>
					<TableHead>Tên danh mục</TableHead>
					<TableHead>Ngày tạo</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((item: CategoryDataType) => (
					<CategoryRow data={item} key={item?.id} />
				))}
			</TableBody>
		</Table>
	);
}
