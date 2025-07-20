import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_URL, BASE_FILE_SERVER_API_URL } from "../constants/base-api-url";
import { cookiesService } from "@core/services";


const axiosInstance = axios.create({
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response.status === 403) {
      const refreshTokenResponse = await request<{
        token: string
      }>({
        url: "auth/refresh-token",
        method: "POST",
        data: {
          token: cookiesService.get("auth-token"),
        }
      });

      const updatedToken = String(refreshTokenResponse?.data?.token);

      if (updatedToken) {
        cookiesService.set("auth-token", updatedToken);
        response.config.headers.Authorization = updatedToken;

        return response;
      }
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export const request = <T = unknown>(options: AxiosRequestConfig) => {
  const token = cookiesService.get("auth-token");

  return axiosInstance<T>({
    ...options,
    baseURL: BASE_API_URL,
    headers: {
      Authorization: token
    },

  });
};

export const fileServerRequest = <T = unknown>(options: AxiosRequestConfig) => {
  return axiosInstance<T>({
    ...options,
    baseURL: BASE_FILE_SERVER_API_URL,
  });
};