import { handleApiError } from "./error";
import { customAxios } from "./utils";

type LogoutSuccessResponse = {
  success: boolean;
};

export async function sendLogoutRequest() {
  try {
    const response: LogoutSuccessResponse = await customAxios.post(
      "/auth/logout"
    );

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
