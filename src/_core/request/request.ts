import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_URL, BASE_FILE_SERVER_API_URL } from "../constants/base-api-url";
import { cookiesService } from "@core/services";

export const request = <T = unknown>(options: AxiosRequestConfig) => {
  const token = cookiesService.get("auth-token");
  return axios<T>({
    ...options,
    baseURL: BASE_API_URL,
    headers: {
      Authorization: token
    }
  });
};

export const fileServerRequest = <T = unknown>(options: AxiosRequestConfig) => {
  return axios<T>({
    ...options,
    baseURL: BASE_FILE_SERVER_API_URL,
  });
};