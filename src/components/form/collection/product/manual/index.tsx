import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function CollectionManualProduct() {
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Sản phẩm</CardTitle>
				<CardDescription>
					Thêm từng sản phẩm vào bộ sưu tập này.
				</CardDescription>
			</CardHeader>
			<CardContent></CardContent>
		</Card>
	);
}
