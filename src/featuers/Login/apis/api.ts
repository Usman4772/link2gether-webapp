import httpInstance from "@/utils/config/axios";

export function LoginAPI(data: any) {
  return httpInstance.post("/auth/login", data);
}
