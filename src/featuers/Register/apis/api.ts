import httpInstance from "@/utils/config/axios";

export function RegisterAPI(data: any) {
  return httpInstance.post("/auth/register", data);
}
