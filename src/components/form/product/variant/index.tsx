import z from "zod";

function checkDuplicateNames<T extends { name: string }>(
	values: T[],
	ctx: z.RefinementCtx,
	message: string,
) {
	const seen = new Map<string, number[]>();

	values.forEach((v, i) => {
		const key = v.name.trim().toLowerCase();
		if (!key) return;
		if (seen.has(key)) {
			seen.get(key)?.push(i);
		} else {
			seen.set(key, [i]);
		}
	});

	for (const [, indexes] of seen.entries()) {
		if (indexes.length > 1) {
			indexes.forEach((i) => {
				ctx.addIssue({
					code: "custom",
					message,
					path: [i, "name"],
				});
			});
		}
	}
}

export const OptionSchema = z
	.array(
		z.object({
			id: z.number().optional(),
			name: z.string().min(1, "Name is required"),
			values: z
				.array(
					z.object({
						id: z.number().optional(),
						name: z.string().min(1, "Value name is required"),
					}),
				)
				.superRefine((values, ctx) =>
					checkDuplicateNames(values, ctx, "This value name already exists"),
				)
				.optional(),
		}),
	)
	.superRefine((options, ctx) =>
		checkDuplicateNames(options, ctx, "This value name already exists"),
	);

export const VariantSchema = z.array(
	z.object({
		id: z.number().optional(),
		origin_price: z.number(),
		sale_price: z.number(),
		discount: z.number(),
		stock: z.number(),
		sku: z.string(),
		file: z.string(),
		options: z.array(
			z.object({
				option_name: z.string(),
				value: z.string(),
			}),
		),
	}),
);

type OptionInputs = {
	id?: number;
	name: string;
	values?: { id?: number; name: string }[];
};

type OptionsReturn = {
	option_id: number;
	option_name: string;
	value_id: number;
	value: string;
};

export function generateOptions(options: OptionInputs[]): OptionsReturn[][] {
	const result: OptionsReturn[][] = [];

	function backtrack(i: number, acc: OptionsReturn[]) {
		if (i === options.length) {
			result.push([...acc]);
			return;
		}

		const opt = options[i];
		if (!opt.values) return;
		for (const val of opt.values) {
			acc.push({
				option_id: opt.id ?? 0,
				option_name: opt.name,
				value_id: val.id ?? 0,
				value: val.name,
			});
			backtrack(i + 1, acc);
			acc.pop();
		}
	}

	if (options.length > 0) backtrack(0, []);

	return result;
}
