import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { MenuType } from "@/types/menu";
import MenuRow from "./row";

interface MenuTableProps {
	data: MenuType[];
}

export default function MenuTable({ data }: MenuTableProps) {
	return (
		<Table>
			<TableHeader className="bg-sidebar">
				<TableRow>
					<TableHead>
						<Checkbox />
					</TableHead>
					<TableHead>Tên</TableHead>
					<TableHead>Vị trí</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((item) => (
					<MenuRow key={item.id} data={item} />
				))}
			</TableBody>
		</Table>
	);
}
