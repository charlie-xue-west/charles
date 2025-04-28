import { handleApiError } from "./error";
import { customAxios } from "./utils";

export async function fetchUserInfo() {
  try {
    const response = await customAxios.get("/user/me");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}
