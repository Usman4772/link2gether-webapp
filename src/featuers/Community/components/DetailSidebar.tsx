import Heading from '@/components/Global/Heading';
import Paragraph from '@/components/Global/Paragraph';
import { PiTimerDuotone } from "react-icons/pi";
import { PiGlobeSimpleLight } from "react-icons/pi";
import { RiChatPrivateLine } from "react-icons/ri";



import React from 'react'
import Rules from './Rules';
import Link from 'next/link';
 export  interface FAQItem {
    id: string;
    question: string;
    answer: string;
  }

function DetailSidebar() {



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
    <div
      className=" w-[30%] h-[85vh] sticky top-0 border  border-border_clr rounded-[10px] overflow-y-scroll scrollbar-hide"
    >
      <div className="flex items-start justify-center flex-col p-4 w-full gap-2 ">
        <Heading
          text="Community name"
          size="20px"
          className="w-full break-all"
        />
        <Paragraph className="w-full break-all" text="Community Description " />
        <div className="flex gap-4 items-center">
          <PiTimerDuotone />
          <Paragraph text="22-12-2020" />
        </div>
        <div className="flex items-center gap-4">
          <PiGlobeSimpleLight />
          <Paragraph text="Public" />
        </div>
        <div className="flex flex-col">
          <Heading text="Members" size="16px" className="font-normal" />
          <strong className="text-heading text-paragraph">3.5M</strong>
        </div>
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
        </section>
      </div>
    </div>
  );
}

export default DetailSidebar;