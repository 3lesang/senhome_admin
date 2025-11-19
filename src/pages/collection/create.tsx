import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
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
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLLECTION_QUERY_KEY } from "@/constants";
import { slugify } from "@/lib/utils";

type CreateCollectionRequest = {
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

export function CollectionCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const saveCollectionMutation = useMutation({
    mutationFn: (value: FormValue) => {
      const slug = slugify(value.seoGroup.slug || value.infoGroup.name);
      const request: CreateCollectionRequest = {
        name: value.infoGroup.name,
        slug: slug,
        meta_title: value.seoGroup.meta_title,
        meta_description: value.seoGroup.meta_description,
        file: value.mediaGroup.file,
        layout: value.layoutGroup.layout,
        conditions: "",
        product_ids: value.productGroup.products.map((p) => p.id),
      };
      return axiosClient.post("/collections", request);
    },
    onSuccess: () => {
      toast.success("Tạo bộ sưu tập thành công");
      queryClient.refetchQueries({ queryKey: [COLLECTION_QUERY_KEY, 1, 10] });
      navigate({ to: "/products/collections" });
    },
  });

  const defaultValues: FormValue = {
    infoGroup: {
      name: "",
      description: { type: "doc", content: [] } as JSONContent,
    },
    seoGroup: {
      slug: "",
      meta_title: "",
      meta_description: "",
    },
    typeGroup: {
      type: "manual",
    },
    mediaGroup: {
      file: "",
    },
    scheduleGroup: {
      schedule: new Date(),
    },
    conditionGroup: {
      conditions: "",
    },
    layoutGroup: {
      layout: "default",
    },
    productGroup: {
      products: [],
    },
  };

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => saveCollectionMutation.mutateAsync(value),
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
          <CardTitle>Thêm nhóm sản phẩm</CardTitle>
          <CardAction>
            <form.AppForm>
              <form.SubscribeButton
                label="Lưu"
                loading={saveCollectionMutation.isPending}
              />
            </form.AppForm>
          </CardAction>
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
      </Card>
    </form>
  );
}
