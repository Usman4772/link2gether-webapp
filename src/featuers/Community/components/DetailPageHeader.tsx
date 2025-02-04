import Heading from '@/components/Global/Heading';
import Link from 'next/link';
import React from 'react'

function DetailPageHeader() {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      <img
        src="/art.jpg"
        className="w-full h-[140px] object-cover  rounded-[10px]"
      />
      <div
        className="w-full items-center justify-between flex h-[130px]"
        style={{ border: "1px solid #E5E5E5", borderRadius: "10px" }}
      >
        <div className="flex items-center gap-4 px-4">
          <div className="w-[80px] h-[80px] bg-white rounded-[50%] flex items-center justify-center relative -top-12">
            <img
              src="/food.jpg"
              className="rounded-[50%] object-cover w-[70px] h-[70px]  "
            />
          </div>
          <div className="flex flex-col  relative -top-8">
            <Heading text="Community Name" className="font-[700]" size="24px" />
            <Link className="text-[#4F7A96] font-[14px]" href={"#"}>
              by Usman Ali
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 px-4">
          <button>Join</button>
          <button>Create Post</button>
        </div>
      </div>
    </div>
  );
}

export default DetailPageHeader