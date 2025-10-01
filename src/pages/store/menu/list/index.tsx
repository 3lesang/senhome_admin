import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import MenuContent from "./content";

export default function MenuListPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Menu</CardTitle>
				<CardDescription>
					Menu hoặc danh sách liên kết website , giúp khách hàng chuyển trang
					trong cửa hàng của bạn. Bạn có thể tạo các menu lồng nhau để hiện thị
					drop-down menus
				</CardDescription>
				<CardAction>
					<Link to="/store/menus/create">
						<Button>
							<PlusIcon />
							Tạo menu
						</Button>
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<MenuContent />
			</CardContent>
		</Card>
	);
}
