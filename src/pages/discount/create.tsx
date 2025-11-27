import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import axiosClient from "@/axios";
import { ActiveFields } from "@/components/form/discount/active-fields";
import { ConditionFields } from "@/components/form/discount/condition-fields";
import { DiscountFields } from "@/components/form/discount/discount-fields";
import { useAppForm } from "@/components/form/discount/hooks/form";
import { PublishFields } from "@/components/form/discount/publish-fields";
import { ValueField } from "@/components/form/discount/value-field";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const schema = z.object({
	discountGroup: z.object({
		has_type: z.boolean(),
		type: z.string(),
		title: z.string(),
		description: z.string(),
		code: z.string(),
	}),
	valueGroup: z.object({
		type: z.string(),
		percent_value: z.number(),
		fixed_value: z.number(),
		apply_to: z.string(),
		products: z.array(
			z.object({
				id: z.number(),
				file: z.string(),
				name: z.string(),
			}),
		),
		collections: z.array(
			z.object({
				id: z.number(),
				file: z.string(),
				name: z.string(),
			}),
		),
	}),
	activeGroup: z.object({
		start_date: z.date(),
		start_time: z.string(),
		has_end: z.boolean(),
		end_date: z.date(),
		end_time: z.string(),
	}),
	conditionGroup: z.object({
		customer_type: z.string(),
		amount_type: z.string(),
		customer: z.string(),
		amount: z.number(),
		quantity: z.number(),
		has_usage_limit: z.any(),
		has_per_customer_limit: z.any(),
		usage_limit: z.number(),
		per_customer_limit: z.number(),
	}),
	publishGroup: z.object({
		status: z.string(),
	}),
});

type FormValues = z.infer<typeof schema>;

export function DiscountCreatePage() {
	const saveDiscountMutation = useMutation({
		mutationFn: async (value: FormValues) => {
			const res = await axiosClient.post<number>("/discounts", {
				code: value.discountGroup.code,
				title: value.discountGroup.title,
				description: value.discountGroup.description,
				discount_type: value.discountGroup.type,
				per_customer_limit: value.conditionGroup.has_per_customer_limit
					? value.conditionGroup.per_customer_limit
					: 0,
				usage_limit: value.conditionGroup.has_usage_limit
					? value.conditionGroup.usage_limit
					: 0,
				starts_at: value.activeGroup.start_date,
				ends_at: value.activeGroup.has_end ? value.activeGroup.end_date : null,
				status: value.publishGroup.status,
			});
			const dType = value.valueGroup.type;
			const percentValue = value.valueGroup.percent_value;
			const fixedValue = value.valueGroup.fixed_value;
			const discountValue = dType === "percent" ? percentValue : fixedValue;

			axiosClient.post(`/discounts/${res.data}/effects`, {
				effect_type: value.valueGroup.type,
				value: discountValue.toString(),
				applies_to: value.valueGroup.apply_to,
			});
			const applyType = value.valueGroup.apply_to;
			const productIDs = value.valueGroup.products.map((i) => i.id);
			const collectionIDs = value.valueGroup.collections.map((i) => i.id);
			const targetIDs =
				applyType === "specific_products" ? productIDs : collectionIDs;

			axiosClient.post(`/discounts/${res.data}/targets`, {
				target_type: value.valueGroup.apply_to,
				ids: targetIDs,
			});
			const conditionType = value.conditionGroup.amount_type;
			if (conditionType) {
				const conditionValue =
					conditionType === "order_amount"
						? value.conditionGroup.amount
						: value.conditionGroup.quantity;
				axiosClient.post(`/discounts/${res.data}/conditions`, {
					condition_type: value.conditionGroup.amount_type,
					operator: "gte",
					value: conditionValue.toString(),
				});
			}
			return res;
		},
		onSuccess: () => {
			toast.success("Thêm khuyến mãi thành công");
		},
	});

	const defaultValues: FormValues = {
		discountGroup: {
			has_type: true,
			type: "code",
			title: "",
			description: "",
			code: "",
		},
		valueGroup: {
			type: "percent",
			percent_value: 0,
			fixed_value: 0,
			apply_to: "all",
			products: [],
			collections: [],
		},
		activeGroup: {
			start_date: new Date(),
			start_time: "",
			has_end: false,
			end_date: new Date(),
			end_time: "",
		},
		conditionGroup: {
			customer_type: "",
			amount_type: "",
			customer: "",
			amount: 0,
			quantity: 0,
			has_usage_limit: false,
			has_per_customer_limit: false,
			usage_limit: 1,
			per_customer_limit: 1,
		},
		publishGroup: {
			status: "draft",
		},
	};

	const form = useAppForm({
		defaultValues,
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => saveDiscountMutation.mutateAsync(value),
		onSubmitInvalid: ({ formApi }) => {
			console.log(formApi.getAllErrors());
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Card className="bg-sidebar border-0 shadow-none max-w-6xl mx-auto">
				<CardHeader>
					<CardTitle>Thêm khuyến mãi</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-12 gap-4">
					<div className="col-span-8 space-y-4">
						<DiscountFields fields="discountGroup" form={form} />
						<ValueField fields="valueGroup" form={form} />
						<ConditionFields fields="conditionGroup" form={form} />
						<ActiveFields fields="activeGroup" form={form} />
					</div>
					<div className="col-span-4">
						<PublishFields fields="publishGroup" form={form} />
					</div>
				</CardContent>
				<CardFooter>
					<form.AppForm>
						<form.SubscribeButton
							label="Lưu"
							loading={saveDiscountMutation.isPending}
						/>
					</form.AppForm>
				</CardFooter>
			</Card>
		</form>
	);
}
