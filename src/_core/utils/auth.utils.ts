import { AUTH_TOKEN_KEY } from "@core/constants";
import { cookiesService } from "@core/services";

export const setAuthToken = (token: string) => {
  cookiesService.set(AUTH_TOKEN_KEY, token);
}

export const getAuthToken = () => {
  return cookiesService.get(AUTH_TOKEN_KEY);
}
