import axios, { AxiosRequestConfig } from "axios";
import { BASE_API_URL } from "../constants/base-api-url";

export const request = (options: AxiosRequestConfig) => {
  return axios({
    ...options,
    baseURL: BASE_API_URL,
  });
};
