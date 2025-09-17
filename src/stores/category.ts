import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { getListCategoryQueryOptions } from "@/handlers/category/query/list";

export const pageAtom = atom(1);
export const limitAtom = atom(10);
export const queryAtom = atom("");
export const selectedAtom = atom<Record<string, boolean>>({});
export const deleteSelectAtom = atom("");

export const categoryParamsAtom = atom((get) => ({
	page: get(pageAtom),
	limit: get(limitAtom),
	query: get(queryAtom),
}));

export function useCategoryList() {
	const [page, setPage] = useAtom(pageAtom);
	const [limit, setLimit] = useAtom(limitAtom);
	const [query, setQuery] = useAtom(queryAtom);
	const [selected, setSelected] = useAtom(selectedAtom);
	const [deleteSelect, setDeleteSelect] = useAtom(deleteSelectAtom);

	const params = { page, limit, query };

	const { data, isLoading, refetch } = useQuery(
		getListCategoryQueryOptions(params),
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
		deleteSelect,
		setDeleteSelect,
	};
}
