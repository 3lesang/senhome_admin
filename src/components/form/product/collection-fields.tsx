import { CollectionInput } from "@/components/form/product/collection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withFieldGroup } from "./hooks/form";

export const CollectionFields = withFieldGroup({
	defaultValues: {
		collections: [] as { id: number; name: string }[],
	},
	render: ({ group }) => {
		return (
			<Card className="shadow-none border-0">
				<CardHeader>
					<CardTitle>Nhóm sản phẩm</CardTitle>
				</CardHeader>
				<CardContent>
					<group.AppField name="collections">
						{(field) => (
							<CollectionInput
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
