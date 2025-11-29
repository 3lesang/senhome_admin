import encode from "@jsquash/avif/encode";
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

export function downloadFile(file: File) {
	const url = URL.createObjectURL(file);
	const a = document.createElement("a");
	a.href = url;
	a.download = file.name;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

async function fileToImageData(file: File): Promise<ImageData> {
	const blob = new Blob([await file.arrayBuffer()], { type: file.type });
	const bitmap = await createImageBitmap(blob);

	const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("Failed to get canvas context");
	}

	ctx.drawImage(bitmap, 0, 0);
	const imageData = ctx.getImageData(0, 0, bitmap.width, bitmap.height);

	bitmap.close();
	return imageData;
}

export async function encodeToAvif(file: File): Promise<File> {
	const imageData = await fileToImageData(file);
	const avifBuffer = await encode(imageData, {
		quality: 50,
		speed: 8,
	});
	return new File([avifBuffer], file.name.replace(/\.[^.]+$/, ".avif"), {
		type: "image/avif",
	});
}
