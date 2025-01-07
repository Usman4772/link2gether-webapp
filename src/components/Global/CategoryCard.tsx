"use client";
import { CategoryType } from "./ChooseCategories";
import MaskButton from "./MaskButton";

export function CategoryCard({ data }: { data: CategoryType }) {
  return (
    <div className=" flex items-center space-x-4 rounded-md border p-4 flex-col gap-4 w-[300px] h-[300px] hover:scale-95 hover:shadow-[0_4px_16px_rgba(17,17,26,0.1),0_8px_32px_rgba(17,17,26,0.05)] bg-[#f1f9ffa3]">
      <img
        src={data?.icon}
        alt="Diplay picture"
        className="w-full object-cover h-2/6 rounded-md"
      />
      <div className="flex items-center justify-start w-full gap-4 h-[70%]">
        <div className="flex-1 space-y-1 ">
          {/* <BellRing className="" /> */}
          <p className="text-sm font-medium leading-none font-semibold">
            {data?.name}
          </p>
          <p className="text-sm text-muted-foreground">{data?.description}</p>
        </div>
      </div>
      <MaskButton
        text="Add"
        onClick={() => console.log("clicked")}
        className="h-[20%] flex items-center justify-center"
      />
    </div>
  );
}
