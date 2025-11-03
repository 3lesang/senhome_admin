import { CollectionConditionInput } from "@/components/form/collection/conditions";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { withFieldGroup } from "./hooks/form";

export const ConditionFields = withFieldGroup({
	defaultValues: {
		conditions: "",
	},
	render({ group }) {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Điều kiện</CardTitle>
					<CardDescription>
						Các sản phẩm sẽ được tự động đưa vào danh mục này dựa vào các điều
						kiện bên dưới.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<group.AppField name="conditions">
						{(field) => (
							<CollectionConditionInput
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
