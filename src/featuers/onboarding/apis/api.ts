import httpInstance from "@/utils/config/axios";

export function getRecommendedCategoriesAPI(data: { categories: string[] }) {
  return httpInstance.post("/user/preferences", data);
}
