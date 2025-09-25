import { Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ContentPage from "./content";

export default function PageStoreListPage() {
	return (
		<Card className="bg-sidebar border-0 shadow-none max-w-7xl mx-auto">
			<CardHeader>
				<CardTitle>Trang nội dung</CardTitle>
				<CardDescription>
					Các trang nội dung của bạn, quản lý và tạo trang mới.
				</CardDescription>
				<CardAction>
					<Link to="/store/pages/create" className={cn(buttonVariants())}>
						<PlusIcon />
						Tạo trang mới
					</Link>
				</CardAction>
			</CardHeader>
			<ContentPage />
		</Card>
	);
}
