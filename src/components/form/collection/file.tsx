import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import type { CollectionFormValuesType } from ".";

interface CollectionThumbnailProps {
	form: UseFormReturn<CollectionFormValuesType>;
}

export function CollectionFile({ form }: CollectionThumbnailProps) {
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Hình ảnh</CardTitle>
			</CardHeader>
			<CardContent>
				<FormField
					control={form.control}
					name="file"
					render={() => (
						<FormItem>
							<FormControl></FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
