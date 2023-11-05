/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";
import { apiUrl } from "../common";
import { localStorage } from "./local.storage";

const api = axios.create({
  baseURL: apiUrl,
  timeout: 1000 * 15, // 15 sec
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.get();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => Promise.reject(console.log(error))
);

export { api };
