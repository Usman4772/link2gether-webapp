import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

const createHttpInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    responseType: "json",
  });

  instance.interceptors.request.use(
    (request) => {
      const token = getCookie("token");
      if (token && typeof token === "string") {
        const decodedToken = decodeURIComponent(token);
        request.headers.Authorization = `Bearer ${decodedToken}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const httpInstance = createHttpInstance();

export const handleLogout = () => {
  deleteCookie("token");
  if (typeof window !== "undefined") {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }
};

export const getHttpInstance = () => httpInstance;

export default httpInstance;
