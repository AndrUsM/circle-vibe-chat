import axios, { AxiosRequestConfig } from "axios";
import i18n from "i18next";

import { BASE_API_URL, BASE_FILE_SERVER_API_URL } from "@core/constants";
import { getAuthToken, setAuthToken } from "@core/utils";
import { notificationFunction } from "@core/hooks";

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
    
    if (response?.status >= 500) {
      notificationFunction({
        type: "error",
        content: i18n.t("http-request.general-internal-server-error.message"),
      })

      return new Promise<any>(() => {});
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