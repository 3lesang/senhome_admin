import { MediaInput } from "@/components/form/product/media";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { withFieldGroup } from "./hooks/form";

const defaultValues: { files: string[] } = { files: [] };

export const MediaFields = withFieldGroup({
	defaultValues,
	render: ({ group }) => {
		return (
			<Card className="shadow-none border-0">
				<CardHeader>
					<CardTitle>Hình ảnh sản phẩm</CardTitle>
				</CardHeader>
				<CardContent>
					<group.AppField name="files">
						{(field) => (
							<MediaInput
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
