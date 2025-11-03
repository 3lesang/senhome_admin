import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { withFieldGroup } from "./hooks/form";

export const SEOFields = withFieldGroup({
	defaultValues: {
		metaTitle: "",
		metaDescription: "",
		slug: "",
	},
	render: ({ group }) => {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Tối ưu SEO</CardTitle>
					<CardDescription>
						Thiết lập các thẻ mô tả giúp khách hàng dễ dàng tìm thấy danh mục
						này trên công cụ tìm kiếm như Google.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<group.AppField name="metaTitle">
						{(field) => (
							<Field>
								<FieldLabel>Tiêu đề</FieldLabel>
								<Input
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</Field>
						)}
					</group.AppField>
					<group.AppField name="metaDescription">
						{(field) => (
							<Field>
								<FieldLabel>Mô tả</FieldLabel>
								<Textarea
									className="resize-none"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</Field>
						)}
					</group.AppField>
					<group.AppField name="slug">
						{(field) => (
							<Field>
								<FieldLabel>Đường dẫn</FieldLabel>
								<Input
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</Field>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});
