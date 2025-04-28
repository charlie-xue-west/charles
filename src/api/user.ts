import { handleApiError } from "./error";
import { customAxios } from "./utils";

export async function fetchUserInfo() {
  try {
    const response = await customAxios.get("/user/me");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function fetchProfilePicUrls() {
  try {
    const response = await customAxios.get("/user/profile-pic-urls");
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
}
