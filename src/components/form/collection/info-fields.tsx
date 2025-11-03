import type { JSONContent } from "@tiptap/core";
import { TextEditor } from "@/components/input/editor";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { withFieldGroup } from "./hooks/form";

export const InfoFields = withFieldGroup({
	defaultValues: {
		name: "",
		description: { type: "doc", content: [] } as JSONContent,
	},
	render({ group }) {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Thông tin chung</CardTitle>
					<CardDescription>Tên, mô tả nhóm sản phẩm</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<group.AppField name="name">
						{(field) => (
							<Field data-invalid={!field.state.meta.isValid}>
								<FieldLabel>Tên</FieldLabel>
								<Input
									aria-invalid={!field.state.meta.isValid}
									placeholder="ví dụ, sản phẩm mới nhất,..."
									value={field.state.value}
									onChange={(e) => field.handleChange(e.currentTarget.value)}
								/>
								{!field.state.meta.isValid && (
									<FieldError errors={field.state.meta.errors} />
								)}
							</Field>
						)}
					</group.AppField>
					<group.AppField name="description">
						{(field) => (
							<Field>
								<FieldLabel>Mô tả</FieldLabel>
								<TextEditor
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
