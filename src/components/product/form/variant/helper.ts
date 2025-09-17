import _ from "lodash";
import type {
	AttributeDataListType,
	VariantDataListType,
	VariantDataType,
	VariantType,
} from "@/types/product";

const cartesian = <T>(arrays: T[][]): T[][] =>
	arrays.reduce<T[][]>(
		(a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
		[[]],
	);

export function buildVariants(
	attributes: AttributeDataListType,
	defaultVariants: VariantDataListType = {},
): VariantDataListType {
	const defaultMap: VariantDataListType = {};
	_.forEach(defaultVariants, (variant) => {
		const comboIds = Object.keys(variant).sort();
		const key = comboIds.join("|");
		defaultMap[key] = variant;
	});

	const attrList = _(attributes)
		.values()
		.filter((attr) => attr.status !== "removed")
		.map((attr) =>
			_.values(attr.options).filter((opt) => opt.status !== "removed"),
		)
		.filter((opts) => opts.length > 0)
		.value();

	if (attrList.length === 0) return {};

	const combos = cartesian(attrList);

	const result: VariantDataListType = {};

	combos.forEach((combo) => {
		const comboIds = combo.map((opt) => opt.id).sort();
		const key = comboIds.join("|");

		const existing = defaultMap[key];
		let variantData: VariantType;

		if (existing) {
			const comboId = comboIds[0];
			if (comboId) {
				const baseVariant = existing[comboId]?.variant;
				const same = _.isEqual(baseVariant, existing[comboId]?.variant);
				if (baseVariant?.id) {
					variantData = {
						...baseVariant,
						status: same ? "unchanged" : "updated",
					};
				}
			}
		} else {
			variantData = {
				id: key,
				price: 0,
				discount: 0,
				stock: 0,
				sku: "",
				status: "new",
			};
		}

		result[key] = combo.reduce<VariantDataType>((map, opt) => {
			map[opt.id] = { option: opt, variant: variantData };
			return map;
		}, {});
	});

	Object.keys(defaultMap).forEach((key) => {
		const variants = defaultMap[key];
		if (!result[key] && variants) {
			const firstId = Object.keys(variants)[0];
			const firstVariant = firstId ? variants[firstId]?.variant : undefined;

			const removedVariant = {
				...(firstVariant ?? {}),
				status: "removed" as const,
			};

			result[key] = Object.keys(variants).reduce<VariantDataType>((map, id) => {
				const v = variants[id];
				if (v) {
					map[id] = {
						option: v.option,
						variant: {
							id: removedVariant.id ?? "",
							price: removedVariant?.price ?? 0,
							discount: removedVariant?.discount ?? 0,
							stock: removedVariant?.stock ?? 0,
							sku: removedVariant?.sku ?? "",
							status: removedVariant.status,
						},
					};
				}
				return map;
			}, {});
		}
	});

	return result;
}

export function filterRemovedVariants(
	variants: VariantDataListType,
): VariantDataListType {
	return Object.fromEntries(
		Object.entries(variants).filter(([_, variantData]) => {
			const first = Object.values(variantData)[0];
			return first?.variant.status !== "removed";
		}),
	);
}

export function updateVariant(
	variants: VariantDataListType = {},
	updated: VariantType,
): VariantDataListType {
	const next = { ...variants };

	const entry = Object.entries(next).find(([_, variantData]) => {
		const first = Object.values(variantData)[0];
		return first?.variant.id === updated.id;
	});

	if (!entry) return variants;

	const [key, variantData] = entry;

	next[key] = Object.fromEntries(
		Object.entries(variantData).map(([optId, variantOption]) => {
			const prevStatus = variantOption.variant.status;

			return [
				optId,
				{
					...variantOption,
					variant: {
						...updated,
						status: prevStatus === "new" ? "new" : "updated",
					},
				},
			];
		}),
	);

	return next;
}
