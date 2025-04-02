"use client";

import DotDropdown from "@/components/Global/DotDropdown";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import Status from "@/components/Global/Status";
import ChangeVisibilityModal from "@/featuers/Community/components/ChangeVisibilityModal";
import RulesModal from "@/featuers/Community/components/RulesModal";
import { getFormattedDate } from "@/utils/frontend/helpers/globals";
import { useState, useMemo } from "react";

interface CommunityHeaderProps {
  id: string;
  community_name: string;
  description: string;
  visibility: string;
  created_at: string;
}

// Color palette options for gradients
const colorPalettes = [
  { from: "from-blue-500", to: "to-indigo-600" },
  { from: "from-purple-500", to: "to-pink-500" },
  { from: "from-green-400", to: "to-cyan-500" },
  { from: "from-yellow-400", to: "to-orange-500" },
  { from: "from-red-500", to: "to-pink-600" },
  { from: "from-teal-400", to: "to-blue-500" },
  { from: "from-fuchsia-500", to: "to-blue-600" },
  { from: "from-amber-400", to: "to-red-500" },
  { from: "from-emerald-400", to: "to-teal-600" },
  { from: "from-rose-400", to: "to-purple-500" },
];

function CommunityHeader({
  data,
  id,
}: {
  data: CommunityHeaderProps;
  id: string;
}) {
  const [openVisibilityModal, setOpenVisibilityModal] = useState(false);
  const [openRulesModal, setOpenRulesModal] = useState(false);
  const dropdownItems = [
    {
      key: "1",
      label: "Change Visibility",
      onClick: () => setOpenVisibilityModal(true),
    },
    {
      key: "2",
      label: "Add Rules",
      onClick: () => setOpenRulesModal(true),
    },
  ];

  // Generate a consistent background pattern based on community name
  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase()
        .substring(0, 2) || "CO"
    );
  };

  // Generate a consistent color palette based on community ID
  const colorPalette = useMemo(() => {
    if (!data?.id) return colorPalettes[0];

    // Use the sum of character codes in the ID to determine the color palette
    const charSum = data.id
      .split("")
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const paletteIndex = charSum % colorPalettes.length;
    return colorPalettes[paletteIndex];
  }, [data?.id]);

  return (
    <div className="mb-8 overflow-hidden rounded-xl shadow-sm border border-gray-100">
      {/* Decorative header banner with gradient */}
      <div
        className={`h-32 bg-gradient-to-r ${colorPalette.from} ${colorPalette.to} relative`}
      >
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="pattern"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        {/* Community initial avatar */}
        <div className="absolute -bottom-10 left-8 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white">
          <div
            className={`w-full h-full rounded-full bg-gradient-to-br ${colorPalette.from} ${colorPalette.to} flex items-center justify-center text-white text-2xl font-bold`}
          >
            {getInitials(data?.community_name)}
          </div>
        </div>

        {/* Actions dropdown */}
        <div className="absolute top-4 right-4">
          <DotDropdown items={dropdownItems} />
        </div>
      </div>

      {/* Content section */}
      <div className="bg-white pt-12 pb-6 px-8">
        <div className="flex flex-col mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Heading text={data?.community_name} size="24px" />
            <Status text={data?.visibility} />
          </div>
          <Paragraph text={data?.description} />
        </div>

        {/* Info grid with icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-${colorPalette.from.split("-")[1]}`}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="font-medium">Created:</span>{" "}
            <span>{getFormattedDate(data?.created_at)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-${colorPalette.from.split("-")[1]}`}
            >
              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"></path>
            </svg>
            <span className="font-medium">ID:</span>{" "}
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {data?.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-${colorPalette.from.split("-")[1]}`}
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span className="font-medium">Visibility:</span>{" "}
            <span className="capitalize">{data?.visibility}</span>
          </div>
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

export default CommunityHeader;
