import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
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

export function convertToFileUrl(record: any) {
	if (!record?.id) return;
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

export function formatRelativeDate(date: Date, locale: string = "en"): string {
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
	const now = new Date();
	const diffInSeconds = (date.getTime() - now.getTime()) / 1000;

	type Division = { amount: number; name: Intl.RelativeTimeFormatUnit };
	const divisions: Division[] = [
		{ amount: 60, name: "second" },
		{ amount: 60, name: "minute" },
		{ amount: 24, name: "hour" },
		{ amount: 7, name: "day" },
		{ amount: 4.34524, name: "week" },
		{ amount: 12, name: "month" },
		{ amount: Number.POSITIVE_INFINITY, name: "year" },
	];

	let unit: Intl.RelativeTimeFormatUnit = "second";
	let value = diffInSeconds;

	for (const division of divisions) {
		if (Math.abs(value) < division.amount) {
			break;
		}
		value /= division.amount;
		unit = division.name;
	}

	return rtf.format(Math.round(value), unit);
}
