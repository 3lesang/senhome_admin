import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { withFieldGroup } from "./hooks/form";
import ScheduleInput from "./schedule";

export const ScheduleFields = withFieldGroup({
	defaultValues: {
		schedule: new Date(),
	},
	render({ group }) {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Xuất bản</CardTitle>
				</CardHeader>
				<CardContent>
					<group.AppField name="schedule">
						{(field) => (
							<Field>
								<FieldLabel>Kênh bán hàng</FieldLabel>
								<ScheduleInput
									value={field.state.value}
									onChange={field.handleChange}
								/>
							</Field>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});
