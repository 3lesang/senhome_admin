import { queryOptions } from "@tanstack/react-query";
import { pocketClient, STORE_COLLECTION } from "@/pocketbase";

export const getStoreQueryOptions = () =>
	queryOptions({
		queryKey: [STORE_COLLECTION],
		queryFn: () => {
			return pocketClient
				.collection<{
					id: string;
					name: string;
					description: string;
					phone: string;
					email: string;
					address: {
						street: string;
						province: { label: string; value: string };
						district: { label: string; value: string };
						ward: { label: string; value: string };
					};
				}>(STORE_COLLECTION)
				.getOne("g04f6768au3k495");
		},
	});
