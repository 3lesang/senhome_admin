import { TagInput } from "@/components/form/product/tag";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { withFieldGroup } from "./hooks/form";

export const TagFields = withFieldGroup({
	defaultValues: {
		tags: [] as string[],
	},
	render: ({ group }) => {
		return (
			<Card className="shadow-none border-0">
				<CardHeader>
					<CardTitle>Nhãn</CardTitle>
					<CardDescription>Nhập và nhấn enter để thêm thẻ</CardDescription>
				</CardHeader>
				<CardContent>
					<group.AppField name="tags">
						{(field) => (
							<TagInput
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
