import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_URL, BASE_FILE_SERVER_API_URL } from "../constants/base-api-url";

export const request = <T = unknown>(options: AxiosRequestConfig) => {
  return axios<T>({
    ...options,
    baseURL: BASE_API_URL,
  });
};

export const fileServerRequest = <T = unknown>(options: AxiosRequestConfig) => {
  return axios<T>({
    ...options,
    baseURL: BASE_FILE_SERVER_API_URL,
  });
};