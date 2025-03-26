import axios, { Method, RawAxiosRequestHeaders } from "axios";

type ResponseData = {
  message?: string;
  error?: string;
  statusCode?: number;
};

export const fetchData = async (
  url: string,
  method: Method,
  headers?: RawAxiosRequestHeaders,
  body?: object
) => {
  try {
    const response = await axios({
      method,
      url,
      headers: headers || {
        "Content-Type": "application/json",
      },
      ...(body && { data: body }),
    });

    return response.data as ResponseData;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        return { error: "ERR_NETWORK", message: error.message };
      }

      if (error.response) {
        return {
          error: error.response.status,
          message: error.response.data || "A server error has occurred",
        };
      }
    }

    if (error instanceof Error) {
      return { error: "Unknown Error", message: error.message };
    }

    return { error: "Unknown Error", message: "An unexpected error occurred." };
  }
};
