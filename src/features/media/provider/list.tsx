import { getListFileQueryOptions } from "@/features/media/handler/query/files";
import type { FileType } from "@/features/media/types";
import { useQuery } from "@tanstack/react-query";
import type { ListResult } from "pocketbase";
import React, { createContext, useContext, useState } from "react";

type PageListContextType = {
  data?: ListResult<FileType>;
  selected?: Record<string, boolean>;
  page: number;
  limit: number;
  query?: string;
  hasSelect?: boolean;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setQuery: (query: string) => void;
  setSelected?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  refetch?: () => void;
  isLoading: boolean;
  setHasSelect?: (select: boolean) => void;
};

const PageListContext = createContext<PageListContextType | undefined>(
  undefined
);

export function PageListProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [query, setQuery] = useState("");
  const [hasSelect, setHasSelect] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const { data, isLoading, refetch } = useQuery(
    getListFileQueryOptions({ page, limit, query })
  );

  return (
    <PageListContext.Provider
      value={{
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
      }}
    >
      {children}
    </PageListContext.Provider>
  );
}

export function usePageList() {
  const context = useContext(PageListContext);
  if (!context) {
    throw new Error("usePageList must be used within a PageListProvider");
  }
  return context;
}
