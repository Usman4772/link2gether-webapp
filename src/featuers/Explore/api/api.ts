import axios from "@/utils/config/axios";
export function fetchExploreCommunitiesAPI(searchQuery: string | number) {
  const params = new URLSearchParams();
  if (searchQuery) {
    params.append("query", searchQuery as string);
  }
  return axios.get(`/explore?${params?.toString()}`);
}
