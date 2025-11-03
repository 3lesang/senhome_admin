import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { withFieldGroup } from "./hooks/form";

export const ActiveFields = withFieldGroup({
	defaultValues: { isActive: true },
	render: ({ group }) => {
		return (
			<Card className="shadow-none border-0">
				<CardHeader>
					<CardTitle>Trạng thái</CardTitle>
				</CardHeader>
				<CardContent>
					<group.AppField name="isActive">
						{(field) => (
							<Field orientation="horizontal">
								<FieldLabel>Hoạt động</FieldLabel>
								<Switch
									checked={field.state.value}
									onCheckedChange={field.handleChange}
								/>
							</Field>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});
