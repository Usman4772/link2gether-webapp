import React, { useState } from "react";
import { getRecommendedCategoriesAPI } from "../apis/api";
import useToast from "@/hooks/useToast";

function useGetRecommendedCommunities() {
  const [btnLoading, setBtnLoading] = useState(false);
  const toast = useToast();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  async function handleSubmit() {
    try {
      setBtnLoading(true);
      const response = await getRecommendedCategoriesAPI({
        categories: selectedCategories,
      });
      if (response.data?.success) {
        toast.success("Categories added successfully");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
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

export default useGetRecommendedCommunities;
