import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import axiosClient from "@/axios";
import { MENU_QUERY_KEY } from "@/constants";

type Params = {
  page: number;
  limit: number;
  query: string;
};

type MenuData = {
  id: number;
  name: string;
  position: string;
  slug: string;
};

type PaginationResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
};

export const getMenusQueryOptions = ({ page, limit, query }: Params) => {
  return queryOptions({
    queryKey: [MENU_QUERY_KEY, page, limit, query],
    queryFn: () => {
      return axiosClient.get<PaginationResponse<MenuData>>("/menus");
    },
  });
};

export function getMenuQueryOptions(id: string) {
  return queryOptions({
    queryKey: [MENU_QUERY_KEY, id],
    queryFn: () => {
      return axiosClient.get<MenuData>(`/menus/${id}`);
    },
  });
}

export function getMenuItemQueryOptions(menuID: string) {
  return queryOptions({
    queryKey: ["menu-items", menuID],
    queryFn: () => {
      return axios.get(`https://bucket.senhome.vn/menu/${menuID}`);
    },
  });
}
