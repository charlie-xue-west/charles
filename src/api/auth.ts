import axios from "axios";

export const sendLogoutRequest = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`;

  try {
    const response = await axios({
      method: "POST",
      url,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
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
