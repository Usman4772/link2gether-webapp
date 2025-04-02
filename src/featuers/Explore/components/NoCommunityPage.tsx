"use client";

import type React from "react";

const NoCommunityPage: React.FC<any> = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl shadow-sm border border-gray-100 min-h-[400px]">
      <div className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
          <path d="M17 3.34a10 10 0 0 1 0 17.32" />
          <path d="M7 3.34a10 10 0 0 0 0 17.32" />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Communities Found
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        There are no communities to explore at the moment.
      </p>
    </div>
  );
};

export default NoCommunityPage;
