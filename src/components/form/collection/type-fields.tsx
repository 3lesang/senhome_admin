import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { withFieldGroup } from "./hooks/form";

export const TypeFields = withFieldGroup({
	defaultValues: {
		type: "manual",
	},
	render({ group }) {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Loại bộ sưu tập</CardTitle>
					<CardDescription>
						Bạn có thể chọn một trong hai cách bên dưới để thêm sản phẩm vào
						danh mục này.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<group.AppField name="type">
						{(field) => (
							<RadioGroup
								name={field.name}
								value={field.state.value}
								onValueChange={field.handleChange}
							>
								<Field orientation="horizontal">
									<RadioGroupItem value="manual" />
									<FieldLabel>Tự chọn sản phẩm</FieldLabel>
								</Field>
								<Field orientation="horizontal">
									<RadioGroupItem value="smart" />
									<FieldLabel>
										Sản phẩm tự động cập nhật dựa trên những điều kiện.
									</FieldLabel>
								</Field>
							</RadioGroup>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});
