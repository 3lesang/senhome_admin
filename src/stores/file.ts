import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { getListFileQueryOptions } from "@/handlers/file/query/list";

export const pageAtom = atom(1);
export const limitAtom = atom(50);
export const queryAtom = atom("");
export const selectedAtom = atom<Record<string, boolean>>({});
export const hasSelectAtom = atom(false);

export const fileParamsAtom = atom((get) => ({
	page: get(pageAtom),
	limit: get(limitAtom),
	query: get(queryAtom),
}));

export function useFileList() {
	const [page, setPage] = useAtom(pageAtom);
	const [limit, setLimit] = useAtom(limitAtom);
	const [query, setQuery] = useAtom(queryAtom);
	const [selected, setSelected] = useAtom(selectedAtom);
	const [hasSelect, setHasSelect] = useAtom(hasSelectAtom);

	const params = { page, limit, query };

	const { data, isLoading, refetch } = useQuery(
		getListFileQueryOptions(params),
	);

	return {
		data,
		page,
		limit,
		query,
		selected,
		hasSelect,
		setPage,
		setLimit,
		setQuery,
		setSelected,
		setHasSelect,
		refetch,
		isLoading,
	};
}
