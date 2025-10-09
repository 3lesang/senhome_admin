export type TreeItem = {
	id: string;
	title: string;
	url: string;
	parentId: string | null;
	order: number;
};
