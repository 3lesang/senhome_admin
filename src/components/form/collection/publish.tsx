import type { UseFormReturn } from "react-hook-form";
import ScheduleInput from "@/components/input/schedule";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import type { CollectionFormValuesType } from ".";

interface CollectionPublishProps {
	form: UseFormReturn<CollectionFormValuesType>;
}

export default function CollectionPublish({ form }: CollectionPublishProps) {
	return (
		<Card className="border-0 shadow-none">
			<CardHeader>
				<CardTitle>Xuất bản</CardTitle>
			</CardHeader>
			<CardContent>
				<FormField
					control={form.control}
					name="schedule"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Kênh bán hàng</FormLabel>
							<FormControl>
								<ScheduleInput {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	);
}
