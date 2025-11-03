import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatVND(n: number = 0) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(n);
}

export function convertToFileUrl(name: string) {
	return `https://bucket.senhome.vn/${name}`;
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

export function calculateDiscount(originPrice: number, salePrice: number) {
	if (originPrice <= 0) return 0;
	const discount = ((originPrice - salePrice) / originPrice) * 100;
	return Math.round(discount);
}
