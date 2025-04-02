"use client";

import type React from "react";

interface NoPostsFoundProps {
  communityName?: string;
}

const NoPostsFound: React.FC<NoPostsFoundProps> = ({
  communityName,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4  w-full h-full">
      <div className="mb-8 w-40 h-40 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3f4f6" />
              <stop offset="100%" stopColor="#e5e7eb" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
          </defs>

          {/* Background folder */}
          <path
            d="M440,112H352V56a24,24,0,0,0-24-24H120A24,24,0,0,0,96,56V400a24,24,0,0,0,24,24H440a24,24,0,0,0,24-24V136A24,24,0,0,0,440,112Z"
            fill="url(#gradient1)"
          />

          {/* Front folder */}
          <path
            d="M416,168H136a8,8,0,0,0-8,8V392a8,8,0,0,0,8,8H416a8,8,0,0,0,8-8V176A8,8,0,0,0,416,168Z"
            fill="url(#gradient2)"
          />

          {/* Empty document lines */}
          <rect x="196" y="216" width="160" height="12" rx="6" fill="#e5e7eb" />
          <rect x="196" y="256" width="160" height="12" rx="6" fill="#e5e7eb" />
          <rect x="196" y="296" width="120" height="12" rx="6" fill="#e5e7eb" />

          {/* Document icon */}
          <path
            d="M176,232v80a8,8,0,0,0,8,8h8a8,8,0,0,0,8-8V232a8,8,0,0,0-8-8h-8A8,8,0,0,0,176,232Z"
            fill="#d1d5db"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Posts Found
      </h2>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        {communityName
          ? `There are no posts in ${communityName} yet. Be the first to share something!`
          : "There are no posts to display at the moment. Start the conversation by creating a new post!"}
      </p>
    </div>
  );
};

export default NoPostsFound;
