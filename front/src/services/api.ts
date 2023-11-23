import axios, { AxiosError } from "axios";
import { apiUrl } from "../common";
import { localStorage } from "./local.storage";

const api = axios.create({
  baseURL: apiUrl,
  timeout: 1000 * 15,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const data = localStorage.get();
    if (data?.token) {
      config.headers.Authorization = `Bearer ${data.token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return {
      ...(response.data || {}),
      status: response.status,
    };
  },
  (error: AxiosError) => {
    if (error.response) {
      return {
        ...(error.response.data || {}),
        status: error.response.status,
      };
    }
    return {
      error: "Error",
    };
  }
);
export { api };
