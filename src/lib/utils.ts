import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type z from "zod";
import { API_KEY } from "@/pocketbase/client";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatVND(n: number = 0) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(n);
}

export function convertToFileUrl(record: {
	id: string;
	collectionName: string;
	file: string;
}) {
	if (!record?.id) return "";
	return `${API_KEY}/api/files/${record?.collectionName}/${record?.id}/${record?.file}?thumb=100x0`;
}

export function slugify(str: string) {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

export function checkDuplicateNames<T extends { name: string }>(
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
