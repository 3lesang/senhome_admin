import type { MenuFormValuesType } from "@/components/form/menu";

export type MenuType = {
	id: string;
	name: string;
	position: "header" | "footer";
	items: MenuFormValuesType["items"];
};
