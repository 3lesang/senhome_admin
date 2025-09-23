import { useSuspenseQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { getListOrderQueryOptions } from "@/handlers/order/query/list";

export const pageAtom = atom(1);
export const limitAtom = atom(10);
export const queryAtom = atom("");
export const selectedAtom = atom<Record<string, boolean>>({});

export const orderParamsAtom = atom((get) => ({
	page: get(pageAtom),
	limit: get(limitAtom),
	query: get(queryAtom),
}));

export function useOrderList() {
	const [page, setPage] = useAtom(pageAtom);
	const [limit, setLimit] = useAtom(limitAtom);
	const [query, setQuery] = useAtom(queryAtom);
	const [selected, setSelected] = useAtom(selectedAtom);

	const params = { page, limit, query };

	const { data, isLoading, refetch } = useSuspenseQuery(
		getListOrderQueryOptions(params),
	);

	return {
		data,
		page,
		limit,
		query,
		selected,
		setPage,
		setLimit,
		setQuery,
		setSelected,
		refetch,
		isLoading,
	};
}
