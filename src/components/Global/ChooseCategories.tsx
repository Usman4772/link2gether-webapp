"use client";
import useHandleChooseCategories from "@/featuers/onboarding/hooks/useHandleChooseCategories";
import {
  categories,
  chooseCategoryHeading,
  chooseCategorySubHeading,
} from "../../featuers/onboarding/static-data";
import MaskButton from "./MaskButton";
import { TextGenerateEffect } from "./TextGenerateEffect";
import { ThreeDCard } from "./ThreeDCard";
import { TypewriterEffectSmooth } from "./TypewriterEffect ";
import useFetchCategories from "@/featuers/onboarding/hooks/useFetchCategories";
import Loading from "./Loading";
export interface CategoryType {
  name: string;
  icon: string;
  onboardingStatus: string;
  description: string;
  value: string;
}
function ChooseCategories() {
  const {
    handleSubmit,
    btnLoading,
    setSelectedCategories,
    selectedCategories,
  } = useHandleChooseCategories();
  const { categories, pageLoading } = useFetchCategories();

  //TODO: in future we can fetch categories which are created already from backend
  if (pageLoading) return <Loading />;
  return (
    <div className="w-screen">
      <h2 className="self-stretch text-[#0D141C] text-center w-full py-8  text-[22px] font-bold leading-paragraph-100  mx-[16px] flex items-center justify-center flex-col ">
        <TypewriterEffectSmooth
          words={chooseCategoryHeading}
          className="text-[30px] "
        />
        <TextGenerateEffect
          words={chooseCategorySubHeading}
          className="w-[40%]"
        />
      </h2>
      <div className="w-full flex items-center justify-center flex-col">
        <div className=" w-[90%] h-auto flex items-start justify-around gap-2 flex-wrap  ">
          {categories.map((category: CategoryType) => {
            return (
              <ThreeDCard
                key={category.name}
                data={category}
                okText={
                  selectedCategories.includes(category.value) ? "Remove" : "Add"
                }
                onClick={() =>
                  selectedCategories.includes(category.value)
                    ? setSelectedCategories((prev) =>
                        prev.filter((item) => item !== category.value)
                      )
                    : setSelectedCategories((prev) => [...prev, category.value])
                }
              />
            );
          })}
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <MaskButton
          text="Continue"
          onClick={handleSubmit}
          loading={btnLoading}
        />
      </div>
    </div>
  );
}

export default ChooseCategories;
