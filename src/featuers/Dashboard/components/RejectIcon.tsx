import type React from "react";

interface RejectRequestIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const RejectRequestIcon: React.FC<RejectRequestIconProps> = ({
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
      <circle cx="100" cy="100" r="80" fill="#FEF2F2" />

      {/* Document */}
      <rect
        x="60"
        y="40"
        width="80"
        height="110"
        rx="6"
        fill="white"
        stroke="#D1D5DB"
        strokeWidth="2"
      />

      {/* Document Header */}
      <rect x="70" y="50" width="20" height="20" rx="10" fill="#E5E7EB" />
      <rect x="95" y="55" width="35" height="5" rx="2.5" fill="#E5E7EB" />
      <rect x="95" y="65" width="25" height="5" rx="2.5" fill="#E5E7EB" />

      {/* Document Lines */}
      <rect x="70" y="80" width="60" height="5" rx="2.5" fill="#E5E7EB" />
      <rect x="70" y="95" width="60" height="5" rx="2.5" fill="#E5E7EB" />
      <rect x="70" y="110" width="40" height="5" rx="2.5" fill="#E5E7EB" />

      {/* Reject Symbol */}
      <g transform="translate(100, 100)">
        <circle cx="0" cy="0" r="25" fill="#EF4444" fillOpacity="0.2" />
        <circle cx="0" cy="0" r="20" stroke="#EF4444" strokeWidth="2" />
        <line
          x1="-10"
          y1="-10"
          x2="10"
          y2="10"
          stroke="#EF4444"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="-10"
          y1="10"
          x2="10"
          y2="-10"
          stroke="#EF4444"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Rejected Text */}
      <rect
        x="75"
        y="135"
        width="50"
        height="10"
        rx="5"
        fill="#EF4444"
        fillOpacity="0.2"
      />
      <text
        x="100"
        y="143"
        textAnchor="middle"
        fill="#EF4444"
        fontFamily="Arial"
        fontSize="8"
        fontWeight="bold"
      >
        REJECTED
      </text>
    </svg>
  );
};

export default RejectRequestIcon;
