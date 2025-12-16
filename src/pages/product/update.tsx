import axiosClient from "@/axios";
import { ActiveFields } from "@/components/form/product/active-fields";
import { CategoryFields } from "@/components/form/product/category-fields";
import { CollectionFields } from "@/components/form/product/collection-fields";
import { useAppForm } from "@/components/form/product/hooks/form";
import { InfoFields } from "@/components/form/product/info-fields";
import { MediaFields } from "@/components/form/product/media-fields";
import { PriceFields } from "@/components/form/product/price-fields";
import { SEOFields } from "@/components/form/product/seo-fields";
import { StockFields } from "@/components/form/product/stock-fields";
import { TagFields } from "@/components/form/product/tag-fields";
import { OptionSchema, VariantSchema } from "@/components/form/product/variant";
import { VariantFields } from "@/components/form/product/variant-fields";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRODUCT_QUERY_KEY } from "@/constants";
import { slugify } from "@/lib/utils";
import {
  getProductContentQueryOptions,
  getProductQueryOptions
} from "@/queries/product";
import { s3Client } from "@/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useBlocker, useParams } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

type UpdateProductRequest = {
  name: string;
  slug: string;
  origin_price: number;
  sale_price: number;
  stock: number;
  sku: string;
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
  toastID: z.union([z.string(), z.number()]),
  infoGroup: z.object({
    name: z.string().min(1, "Name is required"),
    description: z.record(z.string(), z.any()),
  }),
  categoryGroup: z.object({
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
  stockGroup: z.object({
    stock: z.number(),
    sku: z.string()
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

export function ProductUpdatePage() {
  const queryClient = useQueryClient();
  const { id } = useParams({ from: "/(app)/products/$id/update" });
  const getProductQuery = useSuspenseQuery(getProductQueryOptions(id));
  const getProductContentQuery = useSuspenseQuery(
    getProductContentQueryOptions(getProductQuery.data.data.slug),
  );

  const saveProductMutation = useMutation({
    mutationFn: async (value: FormValues) => {
      const slug = slugify(value.seoGroup.slug || value.infoGroup.name);
      const collectionIDs = value.collectionGroup.collections.map((c) => c.id);
      const files = value.fileGroup.files.map((f, i) => ({
        no: i,
        name: f,
        is_primary: i === 0,
      }));
      const request: UpdateProductRequest = {
        name: value.infoGroup.name,
        slug: slug,
        origin_price: value.priceGroup.originPrice,
        sale_price: value.priceGroup.salePrice,
        stock: value.stockGroup.stock,
        sku: value.stockGroup.sku,
        meta_title: value.seoGroup.metaTitle,
        meta_description: value.seoGroup.metaDescription,
        files: files,
        is_active: value.activeGroup.isActive,
        collection_ids: collectionIDs,
        category_id: value.categoryGroup.categoryID,
        tags: value.tagGroup.tags,
        options: value.variantGroup.options,
        variants: value.variantGroup.variants,
      };
      s3Client.send(
        new PutObjectCommand({
          Bucket: "r2-bucket",
          Key: `content/product/${slug}`,
          Body: JSON.stringify(value.infoGroup.description),
          ContentType: "application/json",
        }),
      );
      return axiosClient.put(`/products/${id}`, request);
    },
    onSuccess: async () => {
      toast.success("Update product successfully");
      const toastID = form.getFieldValue("toastID");
      toast.dismiss(toastID);
      form.setFieldValue("toastID", "");
      await queryClient.refetchQueries({
        queryKey: [PRODUCT_QUERY_KEY, 1, 10],
      });
      getProductQuery.refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const defaultValues: FormValues = {
    toastID: "",
    infoGroup: {
      name: getProductQuery.data.data.name,
      description: getProductContentQuery.data.data,
    },
    categoryGroup: {
      categoryID: getProductQuery.data.data.category_id ?? 0,
    },
    priceGroup: {
      originPrice: getProductQuery.data.data.origin_price,
      salePrice: getProductQuery.data.data.sale_price,
    },
    seoGroup: {
      slug: getProductQuery.data.data.slug,
      metaTitle: getProductQuery.data.data.meta_title,
      metaDescription: getProductQuery.data.data.meta_description,
    },
    stockGroup: {
      stock: getProductQuery.data.data.stock,
      sku: getProductQuery.data.data.sku,
    },
    activeGroup: {
      isActive: getProductQuery.data.data.is_active,
    },
    fileGroup: {
      files: getProductQuery.data.data.files ?? [],
    },
    tagGroup: {
      tags: getProductQuery.data.data?.tags ?? [],
    },
    collectionGroup: {
      collections: getProductQuery.data.data.collections ?? [],
    },
    variantGroup: {
      options: getProductQuery.data.data.options ?? [],
      variantOptions: [[]],
      variants: getProductQuery.data.data.variants ?? [],
    },
  };

  const form = useAppForm({
    defaultValues,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value }) => {
      await saveProductMutation.mutateAsync(value);
    },
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
      toast.error("Không hợp lệ, vui lòng nhập lại");
    },
  });

  useBlocker({
    shouldBlockFn: () => {
      const toastID = form.getFieldValue("toastID");
      return !!toastID;
    },
    enableBeforeUnload: true,
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
          <CardTitle>{getProductQuery.data.data.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-4">
            <InfoFields fields="infoGroup" form={form} />
            <MediaFields fields="fileGroup" form={form} />
            <PriceFields fields="priceGroup" form={form} />
            <VariantFields fields="variantGroup" form={form} />
            <StockFields fields="stockGroup" form={form} />
            <SEOFields fields="seoGroup" form={form} />
          </div>
          <div className="col-span-4 space-y-4">
            <ActiveFields fields="activeGroup" form={form} />
            <CategoryFields fields="categoryGroup" form={form} />
            <CollectionFields fields="collectionGroup" form={form} />
            <TagFields fields="tagGroup" form={form} />
          </div>
        </CardContent>
        <CardFooter>
          <form.AppForm>
            <form.SubscribeButton label="Lưu" />
          </form.AppForm>
        </CardFooter>
      </Card>
    </form>
  );
}
