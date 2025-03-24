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
      return error.response ? error.response.data : error.message;
    } else {
    }
  }
};
