import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withFieldGroup } from "./hooks/form";
import { CollectionImageInput } from "./image";

export const MediaFields = withFieldGroup({
	defaultValues: {
		file: "",
	},
	render({ group }) {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Hình ảnh</CardTitle>
				</CardHeader>
				<CardContent>
					<group.AppField name="file">
						{(field) => (
							<CollectionImageInput
								value={field.state.value}
								onChange={field.handleChange}
							/>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});
