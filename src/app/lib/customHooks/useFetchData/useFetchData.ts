import axios, { AxiosError, Method, RawAxiosRequestHeaders } from "axios";
import { useState } from "react";

type ResponseData = {
  message?: string;
  error?: string;
  statusCode?: number;
};

export const useFetchData = () => {
  const [data, setData] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (
    url: string,
    method: Method,
    headers?: RawAxiosRequestHeaders,
    body?: object
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url,
        headers: headers || {
          "Content-Type": "application/json",
        },
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
