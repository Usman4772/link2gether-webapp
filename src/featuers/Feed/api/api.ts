import httpInstance from "@/utils/config/axios";

export function fetchAllPostsAPI() {
  return httpInstance.get("/post/all");
}
