import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";
import { useState } from "react";

type RestActionTypes = "GET" | "PUT" | "Post" | "DELETE";

export const useFetchData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (
    url: string,
    method: RestActionTypes,
    headers: RawAxiosRequestHeaders = {
      "Content-Type": "application/json",
    },
    body?: object
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        headers,
        ...(body && { data: body }),
      });

      setData(response.data);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response ? err.response.data : err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
};
