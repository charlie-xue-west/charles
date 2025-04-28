import axios from "axios";

export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
      return {
        success: false,
        error: { code: "ERR_NETWORK", message: error.message },
      };
    }

    if (error.response) {
      return {
        success: false,
        error: {
          code: error.response.status,
          message:
            error.response.data?.message || "A server error has occurred",
        },
      };
    }
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: { code: "UNKNOWN", message: error.message },
    };
  }

  return {
    success: false,
    error: { code: "UNKNOWN", message: "An unexpected error occurred." },
  };
}
