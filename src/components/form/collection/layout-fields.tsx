import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { withFieldGroup } from "./hooks/form";

export const LayoutFields = withFieldGroup({
	defaultValues: {
		layout: "default",
	},
	render({ group }) {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Bố cục</CardTitle>
				</CardHeader>
				<CardContent>
					<group.AppField name="layout">
						{(field) => (
							<Select
								onValueChange={field.handleChange}
								defaultValue={field.state.value}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="default">Default</SelectItem>
									<SelectItem value="hero">Hero</SelectItem>
									<SelectItem value="home">Home page</SelectItem>
								</SelectContent>
							</Select>
						)}
					</group.AppField>
				</CardContent>
			</Card>
		);
	},
});
