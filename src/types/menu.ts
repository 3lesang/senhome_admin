export type MenuType = {
	id: string;
	name: string;
	position: "header" | "footer";
	items: {
		id: string;
		title: string;
		url: string;
		parentId: string | null;
		order: number;
	}[];
};
