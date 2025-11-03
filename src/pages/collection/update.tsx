import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/core";
import { toast } from "sonner";
import z from "zod";
import axiosClient from "@/axios";
import { useAppForm } from "@/components/form/collection/hooks/form";
import { InfoFields } from "@/components/form/collection/info-fields";
import { LayoutFields } from "@/components/form/collection/layout-fields";
import { MediaFields } from "@/components/form/collection/media-fields";
import { ProductFields } from "@/components/form/collection/product-fields";
import { ScheduleFields } from "@/components/form/collection/schedule-fields";
import { SEOFields } from "@/components/form/collection/seo-fields";
import { TypeFields } from "@/components/form/collection/type-fields";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import { getCollectionQueryOptions } from "@/queries/collection";

type UpdateCollectionRequest = {
	name: string;
	slug: string;
	file: string;
	conditions: string;
	meta_title: string;
	meta_description: string;
	layout: string;
	product_ids: number[];
};

const schema = z.object({
	toastID: z.union([z.string(), z.number()]),
	infoGroup: z.object({
		name: z.string().min(1, "Name is required"),
		description: z.record(z.string(), z.any()),
	}),
	seoGroup: z.object({
		slug: z.string(),
		meta_title: z.string(),
		meta_description: z.string(),
	}),
	typeGroup: z.object({
		type: z.enum(["manual", "smart"]),
	}),
	mediaGroup: z.object({
		file: z.string(),
	}),
	scheduleGroup: z.object({
		schedule: z.date(),
	}),
	conditionGroup: z.object({
		conditions: z.string(),
	}),
	layoutGroup: z.object({
		layout: z.string(),
	}),
	productGroup: z.object({
		products: z.array(
			z.object({ id: z.number(), name: z.string(), file: z.string() }),
		),
	}),
});

type FormValue = z.infer<typeof schema>;

export function CollectionUpdatePage() {
	const { id } = useParams({ from: "/(app)/product/collection/$id" });
	const getCollectionQuery = useSuspenseQuery(getCollectionQueryOptions(id));

	const navigate = useNavigate();
	const saveCollectionMutation = useMutation({
		mutationFn: (value: FormValue) => {
			const slug = slugify(value.seoGroup.slug || value.infoGroup.name);
			const request: UpdateCollectionRequest = {
				name: value.infoGroup.name,
				slug: slug,
				meta_title: value.seoGroup.meta_title,
				meta_description: value.seoGroup.meta_description,
				file: value.mediaGroup.file,
				conditions: "",
				layout: value.layoutGroup.layout,
				product_ids: value.productGroup.products.map((p) => p.id),
			};
			return axiosClient.put(`/collections/${id}`, request);
		},
		onSuccess: () => {
			const toastID = form.getFieldValue("toastID");
			toast.dismiss(toastID);
			form.setFieldValue("toastID", "");
			toast.success("Tạo bộ sưu tập thành công");
			getCollectionQuery.refetch();
			navigate({ to: "/product/collection" });
		},
	});

	const defaultValues: FormValue = {
		toastID: "",
		infoGroup: {
			name: getCollectionQuery.data.data.name,
			description: { type: "doc", content: [] } as JSONContent,
		},
		seoGroup: {
			slug: getCollectionQuery.data.data.slug ?? "",
			meta_title: getCollectionQuery.data.data.meta_title ?? "",
			meta_description: getCollectionQuery.data.data.meta_description ?? "",
		},
		typeGroup: {
			type: "manual",
		},
		mediaGroup: {
			file: getCollectionQuery.data.data.file ?? "",
		},
		scheduleGroup: {
			schedule: new Date(),
		},
		conditionGroup: {
			conditions: getCollectionQuery.data.data.conditions ?? "",
		},
		layoutGroup: {
			layout: getCollectionQuery.data.data.layout,
		},
		productGroup: {
			products: getCollectionQuery.data.data.products?.map((p) => ({
				...p,
				file: p.file ?? "",
			})),
		},
	};

	const form = useAppForm({
		defaultValues,
		validators: {
			onSubmit: schema,
		},
		onSubmit: ({ value }) => saveCollectionMutation.mutateAsync(value),
		listeners: {
			onChange: ({ formApi }) => {
				const toastID = formApi.getFieldValue("toastID");
				if (form.state.isPristine || toastID) return;
				const id = toast.info("You have unsaved changes", {
					duration: Infinity,
					position: "top-center",
					closeButton: false,
					action: {
						label: "Lưu",
						onClick: (event) => {
							event.preventDefault();
							form.handleSubmit();
						},
					},
					cancel: {
						label: "Hủy",
						onClick: () => {
							form.reset();
							formApi.setFieldValue("toastID", "");
						},
					},
				});
				formApi.setFieldValue("toastID", id);
			},
		},
		onSubmitInvalid({ formApi }) {
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
					<CardTitle>{getCollectionQuery.data.data.name}</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-12 gap-4">
					<div className="col-span-8 space-y-4">
						<InfoFields fields="infoGroup" form={form} />
						<TypeFields fields="typeGroup" form={form} />
						<ProductFields fields="productGroup" form={form} />
						<SEOFields fields="seoGroup" form={form} />
					</div>
					<div className="col-span-4 space-y-4">
						<ScheduleFields fields="scheduleGroup" form={form} />
						<MediaFields fields="mediaGroup" form={form} />
						<LayoutFields fields="layoutGroup" form={form} />
					</div>
				</CardContent>
				<CardFooter>
					<form.AppForm>
						<form.SubscribeButton
							label="Lưu"
							loading={saveCollectionMutation.isPending}
						/>
					</form.AppForm>
				</CardFooter>
			</Card>
		</form>
	);
}
