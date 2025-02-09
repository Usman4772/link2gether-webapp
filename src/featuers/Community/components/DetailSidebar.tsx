import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import { PiTimerDuotone } from "react-icons/pi";
import { PiGlobeSimpleLight } from "react-icons/pi";
import { RiChatPrivateLine } from "react-icons/ri";
import { CiTimer } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";

import React from "react";
import Rules from "./Rules";
import Link from "next/link";
import { capitalize, getFormattedDate } from "@/utils/frontend/helpers/globals";
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

function DetailSidebar({ data }: any) {
  // Sample FAQ data
  const faqData: FAQItem[] = [
    {
      id: "item-1",
      question: "Is it FQA or FAQ?",
      answer:
        "It is FAQ (Frequently Asked Questions). FQA is often a misspelling of FAQ.",
    },
    {
      id: "item-2",
      question: "What is the FQA in quality?",
      answer:
        "In quality management, FQA typically refers to Final Quality Assurance, which is the process of verifying that a product meets quality standards before release.",
    },
    {
      id: "item-3",
      question: "What is the full form of FQA in computer?",
      answer:
        "In computing, FAQ (not FQA) stands for Frequently Asked Questions. It's a list of common questions and their answers about a specific topic.",
    },
    {
      id: "item-4",
      question: "What is professional FQA?",
      answer:
        "Professional FQA typically refers to professional Final Quality Assurance roles in various industries, focusing on ensuring product or service quality.",
    },
    {
      id: "item-5",
      question: "What FAQ means?",
      answer:
        "FAQ stands for Frequently Asked Questions. It's a list of common questions and their answers about a particular subject.",
    },
    {
      id: "item-6",
      question: "Is FAQ correct?",
      answer:
        "Yes, FAQ is the correct abbreviation for Frequently Asked Questions. It's widely used and recognized across the internet and in documentation.",
    },
  ];

  return (
    <div className=" w-[30%] h-[85vh] sticky top-0 border  border-border_clr rounded-[10px] overflow-y-scroll scrollbar-hide">
      <div className="flex items-start justify-center flex-col p-4 w-full gap-2 ">
        <Heading
          text="Community details"
          size="20px"
          className="w-full break-all"
        />
        <Paragraph className="w-full " text={data?.description} />
        <div className="flex flex-col gap-4 w-full">
          <section className="flex items-center gap-4  w-full px-4 py-2">
            <div className="w-[48px] h-[48px] rounded-[8px] bg-[#E8EDF5] flex items-center justify-center text-lg">
              {" "}
              <CiTimer />
            </div>
            <div className="flex flex-col">
              <Paragraph
                text={`Created by ${data?.createdBy?.username}`}
                size="16px"
                className="font-[500]"
              />
              <Paragraph text={getFormattedDate(data?.created_at)} />
            </div>
          </section>
          <section className="flex items-center justify-between gap-4  w-full px-4 py-2">
            <div className="flex items-center gap-4 ">
              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#E8EDF5] flex items-center justify-center text-lg">
                {" "}
                <PiGlobeSimpleLight />
              </div>
              <div className="flex flex-col">
                <Paragraph text={capitalize(data?.visibility)} />
              </div>
            </div>
            <button>Change</button>
          </section>
          <section className="flex items-center gap-4  w-full px-4 py-2">
            <div className="w-[48px] h-[48px] rounded-[8px] bg-[#E8EDF5] flex items-center justify-center">
              {" "}
              <img src="/members.svg" width={20} height={20} />
            </div>
            <div className="flex flex-col">
              <Paragraph text={`${data?.memberCount} Members`} />
            </div>
          </section>
          <section className="flex items-center justify-between gap-4  w-full px-4 py-2">
            <div className="flex items-center gap-4  ">
              {" "}
              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#E8EDF5] flex items-center justify-center">
                {" "}
                <img src="/mods.svg" width={15} height={15} />
              </div>
              <div className="flex flex-col">
                <Paragraph text="Moderators (3)" />
              </div>
            </div>
            <button>Change</button>
          </section>
          <section className="flex items-center gap-4 justify-between  w-full px-4 py-2">
            <div className="flex items-center gap-4 ">
              {" "}
              <div className="w-[48px] h-[48px] rounded-[8px] bg-[#E8EDF5] flex items-center justify-center">
                {" "}
                <FiCheckCircle />
              </div>
              <div className="flex flex-col">
                <Paragraph text="Rules" />
              </div>
            </div>
            <button>Add</button>
          </section>
          <Rules items={faqData} />
        </div>
        {/*
       
      
        <section
          className="py-4 w-full"
          style={{
            borderBottom: "1px solid #E5E5E5",
          }}
        >
          <Heading text="Rules" size="16px" className="" />
          <Rules items={faqData} />
        </section>
        <section className="w-full">
          <div className="w-full h-[3rem] bg-slate-200  rounded-md flex items-center gap-2 p-2">
            <img
              src="/food.jpg"
              className="rounded-[50%] object-cover w-[35px] h-[35px]"
              alt="Profile Image"
            />
            <Link href={"#"}>
              <Heading text="Usman ali" size="16px" />
            </Link>
          </div>
        </section> */}
      </div>
    </div>
  );
}

export default DetailSidebar;
