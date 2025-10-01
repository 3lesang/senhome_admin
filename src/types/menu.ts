import type { MenuFormValuesType } from "@/components/menu-form";

export type MenuType = {
	id: string;
	name: string;
	position: "header" | "footer";
	items: MenuFormValuesType["items"];
};
