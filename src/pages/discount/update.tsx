import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
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
import { getDiscountQueryOptions } from "@/queries/discount";

const schema = z.object({
	discountGroup: z.object({
		has_type: z.boolean(),
		type: z.string(),
		title: z.string(),
		description: z.string(),
		code: z.string(),
	}),
	valueGroup: z.object({
		id: z.number(),
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
		id: z.number(),
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

export function DiscountUpdatePage() {
	const { id } = useParams({ from: "/(app)/discounts/$id" });

	const getDiscountQuery = useSuspenseQuery(getDiscountQueryOptions(id));
	const saveDiscountMutation = useMutation({
		mutationFn: async (value: FormValues) => {
			axiosClient.put(`/discounts/${id}/effects/${value.valueGroup.id}`, {
				effect_type: value.valueGroup.type,
				value:
					value.valueGroup.type === "percent"
						? value.valueGroup.percent_value.toString()
						: value.valueGroup.fixed_value.toString(),
				applies_to: value.valueGroup.apply_to,
			});
			axiosClient.put(
				`/discounts/${id}/conditions/${value.conditionGroup.id}`,
				{
					condition_type: value.conditionGroup.amount_type,
					value:
						value.conditionGroup.amount_type === "order_amount"
							? value.conditionGroup.amount.toString()
							: value.conditionGroup.quantity.toString(),
				},
			);
			return axiosClient.put(`/discounts/${id}`, {
				title: value.discountGroup.title,
				description: value.discountGroup.description,
				usage_limit: value.conditionGroup.usage_limit,
				per_customer_limit: value.conditionGroup.per_customer_limit,
				ends_at: value.activeGroup.has_end ? value.activeGroup.end_date : null,
				starts_at: value.activeGroup.start_date,
				status: value.publishGroup.status,
			});
		},
		onSuccess: () => {
			toast.success("Thêm khuyến mãi thành công");
		},
	});

	const [effect] = getDiscountQuery.data.data.effects;
	const [condition] = getDiscountQuery.data.data.conditions;

	const defaultValues: FormValues = {
		discountGroup: {
			has_type: false,
			type: getDiscountQuery.data.data.discount_type ?? "",
			title: getDiscountQuery.data.data.title ?? "",
			code: getDiscountQuery.data.data.code ?? "",
			description: getDiscountQuery.data.data.description ?? "",
		},
		valueGroup: {
			id: effect?.id,
			type: effect?.effect_type,
			percent_value:
				effect?.effect_type === "percent" ? Number(effect?.value) : 0,
			fixed_value: effect?.effect_type === "fixed" ? Number(effect?.value) : 0,
			apply_to: effect?.applies_to,
			products: [],
			collections: [],
		},
		activeGroup: {
			start_date: new Date(getDiscountQuery.data.data.starts_at),
			start_time: "",
			has_end: false,
			end_date: new Date(),
			end_time: "",
		},
		conditionGroup: {
			id: condition?.id,
			customer_type: "",
			customer: "",
			amount_type: condition?.condition_type ?? "",
			amount: Number(condition?.value) ?? 0,
			quantity: Number(condition?.value) ?? 0,
			has_usage_limit: !!getDiscountQuery.data.data.usage_limit,
			has_per_customer_limit: !!getDiscountQuery.data.data.per_customer_limit,
			usage_limit: getDiscountQuery.data.data.usage_limit ?? 0,
			per_customer_limit: getDiscountQuery.data.data.per_customer_limit ?? 0,
		},
		publishGroup: {
			status: getDiscountQuery.data.data.status,
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
