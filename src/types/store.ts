export type StoreType = {
	id: string;
	name: string;
	description: string;
	email: string;
	phone: string;
	address: string;
	location: {
		street: string;
		ward: { id: string; name: string };
		district: { id: string; name: string };
		province: { id: string; name: string };
	};
};

export type StorePageType = {
	id: string;
	title: string;
	slug: string;
	content: string;
	created: Date;
};
