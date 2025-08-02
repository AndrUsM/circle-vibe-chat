import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_URL, BASE_FILE_SERVER_API_URL } from "../constants/base-api-url";
import { cookiesService } from "@core/services";
import { getAuthToken, setAuthToken } from "@core/utils";


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
          token: getAuthToken(),
        }
      });

      const updatedToken = String(refreshTokenResponse?.data?.token);

      if (updatedToken) {
        setAuthToken(updatedToken);
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
  const token = getAuthToken();

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