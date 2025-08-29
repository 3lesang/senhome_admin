import { type ProductAttributeFormType } from "@/components/product-form/schema";
import {
  FILE_GRAPH_COLLECTION,
  pb,
  PRODUCT_ATTRIBUTE_COLLECTION,
  PRODUCT_ATTRIBUTE_VALUE_COLLECTION,
  PRODUCT_COLLECTION,
  PRODUCT_VARIANT_ATTRIBUTES_COLLECTION,
  PRODUCT_VARIANT_COLLECTION,
} from "@/lib/pocketbase";
import type { UpdateProductDataType } from "@/type";
import _ from "lodash";

async function batchMedia(oldMedia: any[], newMedia: any[], productId: string) {
  const removed = _.differenceBy(oldMedia, newMedia, "id");
  const added = _.differenceBy(newMedia, oldMedia, "id");
  const batch = pb.createBatch();

  for (const item of removed) {
    batch.collection(FILE_GRAPH_COLLECTION).delete(item?.record);
  }

  for (const item of added) {
    batch.collection(FILE_GRAPH_COLLECTION).create({
      entity_type: "product",
      product: productId,
      file: item.id,
    });
  }

  if (removed.length || added.length) {
    return batch.send();
  }
}

async function createVariantAttributes(options?: any[]) {
  if (!options) return;
  const batch = pb.createBatch();
  for (const option of options) {
    batch.collection(PRODUCT_VARIANT_ATTRIBUTES_COLLECTION).create({
      attribute: option.attribute,
      attribute_value: option.id,
    });
  }
  return batch.send();
}

async function batchAttributes(
  oldAttribute: ProductAttributeFormType[],
  newAttribute: ProductAttributeFormType[]
) {
  const removed = _.differenceBy(
    oldAttribute,
    newAttribute,
    (o) => o.attribute?.id
  );
  const added = _.differenceBy(
    newAttribute,
    oldAttribute,
    (n) => n.attribute?.id
  );

  if (removed.length) {
    const batch = pb.createBatch();
    for (const item of removed) {
      const id = item.attribute?.id;
      if (id) {
        batch.collection(PRODUCT_ATTRIBUTE_COLLECTION).delete(id);
      }
    }
    batch.send();
  }

  if (added.length) {
    for (const item of added) {
      const payload = {
        name: item.attribute?.name,
      };
      const res = await pb
        .collection(PRODUCT_ATTRIBUTE_COLLECTION)
        .create(payload);

      if (item.attribute) {
        item.attribute.id = res.id;
      }

      const { added: addedOptions } = await batchOptions(
        [],
        item.options ?? [],
        res.id
      );
      item.options = addedOptions;
    }
  }

  const common = _.intersectionBy(
    newAttribute,
    oldAttribute,
    (n) => n.attribute?.id
  );

  const changed = common.filter((n) => {
    const old = oldAttribute.find((o) => o.attribute?.id === n.attribute?.id);
    return !_.isEqual(n, old);
  });

  for (const item of changed) {
    const id = item.attribute?.id;
    const oldItem = oldAttribute.find((o) => o.attribute?.id === id);
    const newItem = newAttribute.find((n) => n.attribute?.id === id);
    if (oldItem?.attribute?.name !== newItem?.attribute?.name) {
      const batch = pb.createBatch();
      const payload = {
        name: newItem?.attribute?.name,
      };
      // batch.collection(PRODUCT_ATTRIBUTE_COLLECTION).update(id, payload);
      // batch.send();
    }

    // batchOptions(oldItem?.options, newItem?.options, id);
  }

  return { removed, added, changed };
}

async function batchOptions(
  oldOption: any[],
  newOption: any[],
  attributeId: string
) {
  const removed = _.differenceBy(oldOption, newOption, "id");
  const added = _.differenceBy(newOption, oldOption, "id");
  const batch = pb.createBatch();

  for (const item of removed) {
    batch.collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION).delete(item.id);
  }

  for (const item of added) {
    const payload = {
      name: item.name,
      attribute: attributeId,
    };
    const res = await pb
      .collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION)
      .create(payload);
    item.id = res.id;
  }

  const common = _.intersectionBy(newOption, oldOption, "id");

  const updated = common.filter((n) => {
    const old = oldOption.find((o) => o.id === n.id);
    return !_.isEqual(n, old);
  });

  for (const item of updated) {
    const payload = {
      name: item.name,
      attribute: attributeId,
    };
    batch
      .collection(PRODUCT_ATTRIBUTE_VALUE_COLLECTION)
      .update(item.id, payload);
  }
  if (removed.length || updated.length) {
    batch.send();
  }
  return { removed, added, updated };
}

async function batchVariants(
  oldVariant: any[],
  newVariant: any[] = [],
  productId?: string
) {
  const removed = _.differenceBy(oldVariant, newVariant, "id");
  const added = _.differenceBy(newVariant, oldVariant, "id");
  const batch = pb.createBatch();
  for (const item of removed) {
    // batch.collection(PRODUCT_VARIANT_COLLECTION).delete(item.id);
  }

  for (const item of added) {
    const payload = {
      price: Number(item.price),
      sku: item.sku,
      stock: Number(item.stock),
      product: productId,
      discount: Number(item.discount) / 100,
    };
    // pb.collection(PRODUCT_VARIANT_COLLECTION).create(payload);
  }

  const common = _.intersectionBy(newVariant, oldVariant, "id");
  const changed = common.filter((n) => {
    const old = oldVariant.find((o) => o.id === n.id);
    return !_.isEqual(n, old);
  });

  for (const item of changed) {
    const payload = {
      price: Number(item.price),
      sku: item.sku,
      stock: Number(item.stock),
      discount: Number(item.discount) / 100,
    };
    // batch.collection(PRODUCT_VARIANT_COLLECTION).update(item.id, payload);
  }

  return { added, removed, changed };
}

async function createVariantFile(variantId: string, fileId: string) {
  return pb.collection(PRODUCT_VARIANT_COLLECTION).create({
    variant: variantId,
    file: fileId,
    entity_type: "variant",
  });
}

async function updateProduct(
  defaultValues: UpdateProductDataType,
  updatedValues: UpdateProductDataType,
  productId: string
) {
  const equal = _.isEqual(defaultValues, updatedValues);
  if (equal) return;

  const payload: Partial<UpdateProductDataType> = _.transform(
    updatedValues,
    (result, value, key) => {
      const typeKey = key as keyof UpdateProductDataType;
      if (!_.isEqual(value, defaultValues[typeKey])) {
        result[typeKey] = value as any;
      }
    },
    {} as Partial<UpdateProductDataType>
  );
  return pb.collection(PRODUCT_COLLECTION).update(productId, payload);
}

export {
  batchAttributes,
  batchMedia,
  batchOptions,
  batchVariants,
  createVariantAttributes,
  createVariantFile,
  updateProduct,
};
