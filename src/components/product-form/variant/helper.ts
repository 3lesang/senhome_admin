import type { AttributeDataList, VariantData, VariantDataList } from "@/type";
import _ from "lodash";
import type { AttributesDataChange } from "./attributes";

const cartesian = <T>(arrays: T[][]): T[][] =>
  arrays.reduce<T[][]>(
    (a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
    [[]]
  );

export function buildVariants(
  attributes: AttributeDataList,
  defaultVariants: VariantDataList = {}
): Record<string, VariantData> {
  const attrList = _(attributes)
    .values()
    .map((attr) => _.values(attr.options))
    .filter((opts) => opts.length > 0)
    .value();

  if (attrList.length === 0) return {};

  const combos = cartesian(attrList);
  const variantsExit = _.values(defaultVariants);

  return combos.reduce<Record<string, VariantData>>((acc, combo) => {
    const comboMap = combo.map((opt) => opt.id);
    const key = comboMap.join("|");

    const foundVariant = _.chain(variantsExit)
      .map((obj) => _.pick(obj, comboMap))
      .find((obj) => !_.isEmpty(obj))
      .thru((obj) => obj && _.values(obj)[0]?.variant)
      .value() ?? {
      id: key,
      price: 0,
      discount: 0,
      stock: 0,
      sku: "",
    };

    acc[key] = combo.reduce<VariantData>((map, opt) => {
      map[opt.id] = { option: opt, variant: foundVariant };
      return map;
    }, {});

    return acc;
  }, {});
}

export function buildAttributes(
  attributes: AttributeDataList,
  values: AttributesDataChange
) {
  let next = { ...attributes };

  next = _.omit(next, [
    ...Object.keys(values.removedAttributes ?? {}),
    ...Object.keys(values.removedAddedAttributes ?? {}),
  ]);

  next = { ...next, ...(values.addedAttributes ?? {}) };

  Object.values(values.updatedAttributes ?? {}).forEach((attr) => {
    const { id, options } = attr;
    const target = next[id as string];
    if (!target) return;

    Object.entries(options?.updated ?? {}).forEach(([optId, optData]) => {
      if (target.options?.[optId]) {
        target.options[optId] = { ...target.options[optId], ...optData };
      }
    });

    if (options?.added) {
      target.options = { ...target.options, ...options.added };
    }

    const removeKeys = [
      ...Object.keys(options?.removed ?? {}),
      ...Object.keys(options?.removedAdded ?? {}),
    ];
    if (removeKeys.length > 0) {
      target.options = _.omit(target.options, removeKeys);
    }
  });

  return next;
}
