"use client";
import { createContext, ReactNode } from "react";
import Axios, { AxiosInstance, AxiosTransformer } from "axios";

import { useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import qs from "qs";
import { eqOrLikeQuery } from "../../types/constants";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

axios.interceptors.request.use((config) => {
  // Read token for anywhere, in this case directly from localStorage
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// response interceptor
axios.interceptors.response.use(
  (response: any) => {
    const data = response.data;
    // console.log("response:", response);
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202 ||
      response.status === 203 ||
      response.status === 204
    ) {
      return data;
    }

    if (response.status === 400) {
      console.log("에러야 ");
      // TODO: 에러 Alert 처리
    } else if (response.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    return Promise.reject(new Error(response.statusText || "Error"));
  },
  (error: any) => {
    console.log("err:", error); // for debug
    console.log("err:", error.response); // for debug
    if (error.response && error.response.status === 400) {
      localStorage.removeItem("token");
    }

    const msg = "요청 오류";
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          console.log("Sssssssssssssss");
          // TODO: 에러 Alert 처리
          break;
        // 401: 로그인하지 않음
        case 401:
          console.log("이게탓어");
          localStorage.removeItem("token");

          window.location.href = "/login";
          break;
        // 403 토큰 만료
        case 403:
          // TODO: 에러 Alert 처리

          alert(error.response.data?.message);

          // window.location.href = '/login';
          break;
        case 404:
          // TODO: 에러 Alert 처리
          break;
        case 406:
          // TODO: 에러 Alert 처리
          break;
        default:
          // TODO: 에러 Alert 처리
          alert(error);
          break;
      }
    }

    // throw new Error(error);
    return Promise.reject(error);
  },
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
    get: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
  }),
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

const transformPagination = (pagination: any) => {
  if (!pagination) return;

  const current = pagination.current
    ? pagination.current
    : pagination.defaultCurrent;
  const pageSize = pagination.pageSize
    ? pagination.pageSize
    : pagination.defaultPageSize;

  let start = 0;
  if (current && pageSize) {
    start = (current - 1) * pageSize;
  }

  return {
    start,
    limit: pageSize,
  };
};

const transformFilters = (filters: any, url: any) => {
  // console.log("유알에");
  // console.log(url);
  if (!filters) return;
  let result: any[] = [];
  for (const key in filters) {
    if (!filters[key] || filters[key] === null) continue;
    let basic = ":like:";
    eqOrLikeQuery.map((res: any) => {
      if (res.key === url) {
        res.selectType.map((item: any) => {
          if (item === key) {
            basic = ":eq:";
          }
        });
      }
    });

    result = [...result, [key + basic + filters[key]]];
  }
  return result;
};

const transformSorter = (sorter: any) => {
  if (!sorter) return;

  let result = "";
  if (sorter.field && sorter.order) {
    let order = "desc";
    if (sorter.order === "ascend") order = "asc";
    result = sorter.field + " " + order;
  }

  return result;
};

type listParams = {
  limit?: number;
  offset?: number;
  filter?: string[];
  order?: string;
};
const useGetList = <T>(
  key: string,
  url: string,
  pagination?: any,
  filters?: any,
  sorter?: any,
) => {
  const axios = useAxios();

  const service = async () => {
    let params: listParams = {};
    // console.log(key);
    // console.log(transformFilters(filters, url));
    params = { ...transformPagination(pagination) };
    params.filter = transformFilters(filters, url);
    params.order = transformSorter(sorter);

    
    const transformRequest: AxiosTransformer = (data: any, headers: any) => {};
    // console.log("url:", url);
    const data: T = await axios.get(`${url}`, {
      params,
      paramsSerializer: (params: any) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
      transformRequest,
    });

    return data;
  };
  return useQuery(key, () => service());
};

const useGetOne = <T>(key: string, url: string, params?: any) => {
  const axios = useAxios();

  const service = async () => {
    const data: T = await axios.get(`${url}`, params);

    return data;
  };
  return useQuery(key, () => service());
};

const useGetQuery = <T>(key: string, url: string, query?: any) => {
  const axios = useAxios();
  const queryString = qs.stringify(query);
  const service = async () => {
    const data: T = await axios.get(`${url}?${queryString}`);

    return data;
  };
  return useQuery(key, () => service());
};

const axiosFileUpload = async <T, U>(url: string, formData: any) => {
  const data: U = await axios.post(`${url}`, formData);
  return data;
};

const useCreate = <T, U>(url: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(async (params: T) => {
    const data: U = await axios.post(`${url}`, params);
    return data;
  });
};

const useUpdate = <T>(url: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(async (item: T) => {
    const data: T = await axios.patch(`${url}`, item);
    return data;
  });
};

const useDelete = <T>(url: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(async (id: number) => {
    const data: T = await axios.delete(`${url}?id=${id}`);
    return data;
  });
};

const useBatch = (url: string) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  return useMutation(async (ids: number[]) => {
    const data = await axios.post(`${url}`, { idList: ids });
    return data;
  });
};

export {
  useGetOne,
  useGetQuery,
  useGetList,
  useUpdate,
  useCreate,
  useDelete,
  useBatch,
  axiosFileUpload,
};

export default axios;
