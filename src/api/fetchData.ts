import axios, { Method, RawAxiosRequestHeaders } from "axios";

export const fetchData = async (
  url: string,
  method: Method,
  withCredentials: boolean,
  headers: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  },
  body?: object
) => {
  try {
    const response = await axios({
      method,
      url,
      withCredentials,
      headers,
      ...(body && { data: body }),
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
        return { error: "ERR_NETWORK", message: error.message };
      }

      if (error.response) {
        return {
          error: error.response.status,
          message: error.response.data.message || "A server error has occurred",
        };
      }
    }

    if (error instanceof Error) {
      return { error: "Unknown Error", message: error.message };
    }

    return { error: "Unknown Error", message: "An unexpected error occurred." };
  }
};
