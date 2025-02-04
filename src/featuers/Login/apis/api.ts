import httpInstance from "@/utils/config/axios";
import axios from "axios";

export function LoginAPI(data: any) {
  return axios.post(
    "https://link2gether-webapp.vercel.app/api/auth/login",
    data
  );
}
