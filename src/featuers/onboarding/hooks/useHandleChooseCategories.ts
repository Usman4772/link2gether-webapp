import { useState } from "react";
import { getRecommendedCategoriesAPI } from "../apis/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleAPIErrors } from "@/utils/frontend/handleErrors";

function useHandleChooseCategories() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const router = useRouter();

  async function handleSubmit() {
    try {
      setBtnLoading(true);
      const response = await getRecommendedCategoriesAPI({
        categories: selectedCategories,
      });
      if (response.data?.success) {
        toast.success("Categories added successfully");
        router.push("/onboarding/communities");
      }
    } catch (error: any) {
      handleAPIErrors(error);
    } finally {
      setBtnLoading(false);
    }
  }
  return {
    handleSubmit,
    btnLoading,
    setSelectedCategories,
    selectedCategories,
  };
}

export default useHandleChooseCategories;
