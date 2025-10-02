import type { StoreLocationFormValuesType } from "@/components/form/store/location";

export type StoreType = {
	id: string;
	name: string;
	description: string;
	email: string;
	phone: string;
	address: string;
	location: StoreLocationFormValuesType;
};

export type StorePageType = {
	id: string;
	title: string;
	slug: string;
	content: string;
	created: Date;
};
