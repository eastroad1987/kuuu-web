"use client";
import { useMemo } from "react";
import axios, { AxiosContext } from "../../lib/api/request";

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => {
    return axios;
  }, []);

  return <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>;
};

export default AxiosProvider;
