import { handleAPIErrors } from "@/utils/frontend/handleErrors";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchCategoriesAPI } from "../apis/api";
import { CategoryType } from "@/components/Global/ChooseCategories";

function useFetchCategories() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const router = useRouter();
  async function fetchCategories() {
    try {
      setPageLoading(true);
      const response = await fetchCategoriesAPI();
      if (response?.data?.success) {
        setCategories(response?.data?.data);
      } else if (response?.data?.errors[0]?.onboardingStatus == "completed") {
        router.push("/");
      }
    } catch (error) {
      handleAPIErrors(error);
    } finally {
      setPageLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);
  return {
    categories,
    pageLoading,
    fetchCategories,
  };
}

export default useFetchCategories;
