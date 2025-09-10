import { getListProductQueryOptions } from "@/features/product/handler/query/list";
import type { ProductDataType } from "@/features/product/types";
import { useQuery } from "@tanstack/react-query";
import type { ListResult } from "pocketbase";
import React, { createContext, useContext, useState } from "react";

type PageListContextType = {
  data?: ListResult<ProductDataType>;
  selected?: Record<string, boolean>;
  page: number;
  limit: number;
  query?: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setQuery: (query: string) => void;
  setSelected?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  refetch?: () => void;
  isLoading: boolean;
};

const PageListContext = createContext<PageListContextType | undefined>(
  undefined
);

export function PageListProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const { data, isLoading, refetch } = useQuery(
    getListProductQueryOptions({ page, limit, query })
  );

  return (
    <PageListContext.Provider
      value={{
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
