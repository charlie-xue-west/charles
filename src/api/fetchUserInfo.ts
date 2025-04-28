import axios from "axios";

export const fetchUserInfo = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`;

  try {
    const response = await axios({
      method: "GET",
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
        return { error: { status: "ERR_NETWORK", message: error.message } };
      }

      if (error.response) {
        return {
          error: {
            status: error.response.status,
            message:
              error.response.data.message || "A server error has occurred",
          },
        };
      }
    }

    if (error instanceof Error) {
      return { error: { status: "unknown", message: error.message } };
    }

    return {
      error: { status: "unknown", message: "An unexpected error occurred." },
    };
  }
};
