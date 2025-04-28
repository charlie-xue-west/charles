import { handleApiError } from "./error";
import { customAxios } from "./utils";

export async function sendLogoutRequest() {
  try {
    const response = await customAxios.post("/auth/logout");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}
