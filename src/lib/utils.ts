import type { OptionInputType } from "@/components/product-form";
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
  return `${API_URL}/api/files/${record?.collectionName}/${record?.id}/${record?.file}`;
};

function cartesian<T>(arrays?: T[][]) {
  return arrays?.reduce<T[][]>(
    (acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])),
    [[]]
  );
}

export function generateVariants(groups?: OptionInputType[]) {
  const optionArrays = groups?.map(
    (group) =>
      group?.options?.map((option) => ({
        attribute: group.attribute,
        option,
      })) ?? []
  );

  return cartesian(optionArrays);
}
