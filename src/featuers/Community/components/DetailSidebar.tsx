import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import { CiTimer } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import { PiGlobeSimpleLight } from "react-icons/pi";

import CustomButton from "@/components/Global/CustomButton";
import { capitalize, getFormattedDate } from "@/utils/frontend/helpers/globals";
import { useState } from "react";
import ChangeVisibilityModal from "./ChangeVisibilityModal";
import RulesModal from "./RulesModal";
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

function DetailSidebar({ data, id }: any) {
  const [openVisibilityModal, setOpenVisibilityModal] =
    useState<boolean>(false);
  const [openRulesModal, setOpenRulesModal] = useState<boolean>(false);


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
                text={`Created by ${
                  data?.isAdmin ? "you" : data?.createdBy?.username
                }`}
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
            {data?.isAdmin && data?.memberShipStatus == "joined" && (
              <CustomButton
                text="Change"
                variant={"primary"}
                onClick={() => setOpenVisibilityModal(true)}
              />
            )}
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
                <Paragraph text={`Moderators ${data?.moderators?.length}`} />
              </div>
            </div>
            {/*todo redirect to dashboard */}
            {data?.isAdmin && data?.memberShipStatus == "joined" && (
              <CustomButton
                text="Manage"
                variant={"primary"}
              />
            )}
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
            {data?.isAdmin && data?.memberShipStatus == "joined" && (
              <CustomButton
                text="Add"
                variant={"primary"}
                onClick={() => setOpenRulesModal(true)}                                  
              />                                                                                   
            )}
          </section>
          {data?.rules?.map((data: { rule: string }, index: number) => (
            <Paragraph text={`${index + 1}. ${data.rule}`} key={index} />
          ))}
        </div>
      </div>
      <ChangeVisibilityModal
        openModal={openVisibilityModal}
        setOpenModal={setOpenVisibilityModal}
        data={data}
        id={id}
      />
      <RulesModal
        openModal={openRulesModal}
        setOpenModal={setOpenRulesModal}
        id={id}
      />
    </div>
  );
}

export default DetailSidebar;
