"use client";

import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import { CiTimer } from "react-icons/ci";
import { FiCheckCircle, FiUsers, FiShield } from "react-icons/fi";
import { PiGlobeSimpleLight } from "react-icons/pi";
import { MdOutlineLock } from "react-icons/md";
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
    <div className="w-full bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-100">
        <Heading
          text="Community Details"
          size="18px"
          className="text-gray-800 font-semibold"
        />
      </div>

      {/* Content area with custom scrollbar */}
      <div className="max-h-[calc(85vh-60px)] overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
        {/* Description */}
        {data?.description && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <Paragraph
              className="text-gray-700 leading-relaxed"
              text={data?.description}
            />
          </div>
        )}

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-4">
          {/* Creation info */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 hover:border-blue-200 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <CiTimer className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium text-sm">
                  Created by {data?.isAdmin ? "you" : data?.createdBy?.username}
                </span>
                <span className="text-gray-500 text-xs">
                  {getFormattedDate(data?.created_at)}
                </span>
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div
            className="bg-white rounded-lg border border-gray-100 p-3 hover:border-blue-200 transition-colors duration-200 cursor-pointer"
            onClick={() => data?.isAdmin && setOpenVisibilityModal(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                  {data?.visibility === "private" ? (
                    <MdOutlineLock className="w-5 h-5" />
                  ) : (
                    <PiGlobeSimpleLight className="w-5 h-5" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-medium text-sm">
                    {capitalize(data?.visibility)} Community
                  </span>
                  <span className="text-gray-500 text-xs">
                    {data?.visibility === "private"
                      ? "Only approved members can view and post"
                      : "Anyone can view and join"}
                  </span>
                </div>
              </div>
              {data?.isAdmin && (
                <span className="text-blue-500 text-xs font-medium">
                  Change
                </span>
              )}
            </div>
          </div>

          {/* Members */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 hover:border-blue-200 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <FiUsers className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium text-sm">
                  {data?.memberCount || 0} Members
                </span>
                <span className="text-gray-500 text-xs">
                  {data?.activeMembers
                    ? `${data.activeMembers} active today`
                    : "Join the community"}
                </span>
              </div>
            </div>
          </div>

          {/* Moderators */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 hover:border-blue-200 transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                <FiShield className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-800 font-medium text-sm">
                  Moderators {data?.moderators}
                </span>
                <span className="text-gray-500 text-xs">
                  Help maintain community standards
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rules section */}
        <div className="mt-4">
          <div
            className="flex items-center justify-between mb-3 bg-white rounded-lg border border-gray-100 p-3 hover:border-blue-200 transition-colors duration-200 cursor-pointer"
            onClick={() => data?.isAdmin && setOpenRulesModal(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <span className="text-gray-800 font-medium text-sm">
                Community Rules
              </span>
            </div>
            {data?.isAdmin && (
              <span className="text-blue-500 text-xs font-medium">Edit</span>
            )}
          </div>

          {data?.rules && data.rules.length > 0 ? (
            <div className="bg-white rounded-lg border border-gray-100 p-4 space-y-2">
              {data?.rules?.map((rule: { rule: string }, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-2 pb-2 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mt-0.5">
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                  <Paragraph
                    text={rule.rule}
                    className="text-gray-700 text-sm"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-gray-500 text-sm">
                No rules have been set for this community yet.
              </p>
              {data?.isAdmin && (
                <CustomButton
                  text="Add Rules"
                  variant="secondary"
                  className="mt-2 text-sm py-1 px-3"
                  onClick={() => setOpenRulesModal(true)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
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
