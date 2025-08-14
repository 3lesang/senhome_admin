import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL } from "./pocketbase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatVND(n: number = 0) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

export const convertToFileUrl = (record: any) => {
  if (!record?.id) return;
  return `${API_URL}/api/files/${record?.collectionName}/${record?.id}/${record?.image}`;
};
