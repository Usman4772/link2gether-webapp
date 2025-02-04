import axios from "@/utils/config/axios";

export function getRecommendedCategoriesAPI(data: { categories: string[] }) {
  return axios.post("/user/preferences", data);
}

export function getRecommendedCommunitiesAPI() {
  return axios.get("/community/recommended");
}

export function joinCommunitiesAPI(data: string[]) {
  return axios.post("/community/multiple", { joined: data });
}

export function fetchCategoriesAPI() {
  return axios.get("/user/categories");
}
