import type React from "react";

interface HidePostIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const HidePostIcon: React.FC<HidePostIconProps> = ({
  width = 120,
  height = 120,
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="100" cy="100" r="80" fill="#F3F4F6" />

      {/* Post Card */}
      <rect
        x="55"
        y="60"
        width="90"
        height="110"
        rx="8"
        fill="white"
        stroke="#E5E7EB"
        strokeWidth="2"
      />

      {/* Post Header */}
      <circle cx="75" cy="80" r="8" fill="#E5E7EB" />
      <rect x="90" y="76" width="40" height="8" rx="4" fill="#E5E7EB" />

      {/* Post Content Lines */}
      <rect x="65" y="100" width="70" height="6" rx="3" fill="#E5E7EB" />
      <rect x="65" y="115" width="70" height="6" rx="3" fill="#E5E7EB" />
      <rect x="65" y="130" width="50" height="6" rx="3" fill="#E5E7EB" />

      {/* Eye with Slash (Hide Symbol) */}
      <g transform="translate(100, 100) scale(0.8)">
        <path
          d="M100,50C60,50,25,75,10,110c15,35,50,60,90,60s75-25,90-60C175,75,140,50,100,50z"
          fill="#FFFFFF"
          stroke="#10B981"
          strokeWidth="5"
        />
        <circle cx="100" cy="110" r="25" fill="#10B981" />
        <line
          x1="40"
          y1="50"
          x2="160"
          y2="170"
          stroke="#EF4444"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default HidePostIcon;
