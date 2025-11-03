import axiosClient from "@/axios";
import { ActiveFields } from "@/components/form/product/active-fields";
import { CollectionFields } from "@/components/form/product/collection-fields";
import { useAppForm } from "@/components/form/product/hooks/form";
import { InfoFields } from "@/components/form/product/info-fields";
import { MediaFields } from "@/components/form/product/media-fields";
import { PriceFields } from "@/components/form/product/price-fields";
import { SEOFields } from "@/components/form/product/seo-fields";
import { TagFields } from "@/components/form/product/tag-fields";
import { OptionSchema, VariantSchema } from "@/components/form/product/variant";
import { VariantFields } from "@/components/form/product/variant-fields";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRODUCT_QUERY_KEY } from "@/constants";
import { slugify } from "@/lib/utils";
import { s3Client } from "@/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/core";
import { toast } from "sonner";
import z from "zod";

type CreateProductRequest = {
  name: string;
  slug: string;
  origin_price: number;
  sale_price: number;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  category_id: number;
  files: { name: string; no: number; is_primary: boolean }[];
  tags: string[];
  collection_ids: number[];
  options?: {
    name: string;
    values?: { name: string }[];
  }[];
  variants: {
    origin_price: number;
    sale_price: number;
    file: string;
    stock: number;
    sku: string;
  }[];
};

const schema = z.object({
  infoGroup: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.record(z.string(), z.any()),
    categoryID: z.number(),
  }),
  priceGroup: z.object({
    originPrice: z.number(),
    salePrice: z.number(),
  }),
  seoGroup: z.object({
    slug: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
  }),
  activeGroup: z.object({
    isActive: z.boolean(),
  }),
  collectionGroup: z.object({
    collections: z.array(z.object({ id: z.number(), name: z.string() })),
  }),
  fileGroup: z.object({
    files: z.array(z.string()),
  }),
  tagGroup: z.object({
    tags: z.array(z.string()),
  }),
  variantGroup: z.object({
    variantOptions: z.array(
      z.array(z.object({ option_name: z.string(), value: z.string() })),
    ),
    options: OptionSchema,
    variants: VariantSchema,
  }),
});

type FormValues = z.infer<typeof schema>;

export function ProductCreatePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const saveProductMutation = useMutation({
    mutationFn: async (value: FormValues) => {
      const slug = slugify(value.seoGroup.slug || value.infoGroup.name);
      const collectionIDs = value.collectionGroup.collections.map((c) => c.id);
      const files = value.fileGroup.files.map((f, i) => ({
        no: i,
        name: f,
        is_primary: i === 0,
      }));
      const request: CreateProductRequest = {
        name: value.infoGroup.name,
        slug: slug,
        origin_price: value.priceGroup.originPrice,
        sale_price: value.priceGroup.salePrice,
        meta_title: value.seoGroup.metaTitle,
        meta_description: value.seoGroup.metaDescription,
        is_active: value.activeGroup.isActive,
        category_id: value.infoGroup.categoryID,
        files: files,
        tags: value.tagGroup.tags,
        collection_ids: collectionIDs,
        options: value.variantGroup.options,
        variants: value.variantGroup.variants,
      };
      s3Client.send(
        new PutObjectCommand({
          Bucket: "r2-bucket",
          Key: `content/product/${slug}`,
          Body: new Blob([JSON.stringify(value.infoGroup.description)], {
            type: "application/json",
          }),
        }),
      );
      return axiosClient.post("/products", request);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [PRODUCT_QUERY_KEY, 1, 10],
      });
      navigate({ to: "/product", search: { page: 1, size: 10 } });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const defaultValues: FormValues = {
    infoGroup: {
      name: "",
      description: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            attrs: {
              textAlign: null,
            },
            content: [],
          },
        ],
      } as JSONContent,
      categoryID: 0,
    },
    priceGroup: {
      originPrice: 0,
      salePrice: 0,
    },
    seoGroup: {
      slug: "",
      metaTitle: "",
      metaDescription: "",
    },
    activeGroup: {
      isActive: true,
    },
    fileGroup: {
      files: [],
    },
    tagGroup: {
      tags: [],
    },
    collectionGroup: {
      collections: [],
    },
    variantGroup: {
      options: [],
      variantOptions: [[]],
      variants: [],
    },
  };

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: ({ value }) => saveProductMutation.mutateAsync(value),
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
          <CardTitle>Thêm sản phẩm</CardTitle>
          <CardAction>
            <form.AppForm>
              <form.SubscribeButton
                label="Lưu"
                loading={saveProductMutation.isPending}
              />
            </form.AppForm>
          </CardAction>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-4">
            <InfoFields fields="infoGroup" form={form} />
            <MediaFields fields="fileGroup" form={form} />
            <PriceFields fields="priceGroup" form={form} />
            <VariantFields fields="variantGroup" form={form} />
            <SEOFields fields="seoGroup" form={form} />
          </div>
          <div className="col-span-4 space-y-4">
            <ActiveFields fields="activeGroup" form={form} />
            <CollectionFields fields="collectionGroup" form={form} />
            <TagFields fields="tagGroup" form={form} />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
