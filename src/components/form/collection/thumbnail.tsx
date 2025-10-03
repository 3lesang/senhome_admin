import type { UseFormReturn } from "react-hook-form";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { CollectionFormValuesType } from ".";

interface CollectionThumbnailProps {
	form: UseFormReturn<CollectionFormValuesType>;
}

export default function CollectionThumbnail({
	form,
}: CollectionThumbnailProps) {
	console.log(form);
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Hình ảnh</CardTitle>
			</CardHeader>
		</Card>
	);
}
