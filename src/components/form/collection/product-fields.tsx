import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { withFieldGroup } from "./hooks/form";
import { CollectionProductInput } from "./product";

type ProductData = {
	id: number;
	name: string;
	file: string;
};

const defaultValues: {
	products: ProductData[];
} = {
	products: [],
};

export const ProductFields = withFieldGroup({
	defaultValues,
	render({ group }) {
		return (
			<Card className="border-0 shadow-none">
				<CardHeader>
					<CardTitle>Sản phẩm</CardTitle>
					<CardDescription>
						Thêm từng sản phẩm vào bộ sưu tập này.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<group.AppField name="products">
						{(field) => (
							<CollectionProductInput
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
