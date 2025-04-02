import type React from "react";

interface DismissReportIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const DismissReportIcon: React.FC<DismissReportIconProps> = ({
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

      {/* Report Document */}
      <rect
        x="55"
        y="50"
        width="90"
        height="110"
        rx="6"
        fill="white"
        stroke="#D1D5DB"
        strokeWidth="2"
      />

      {/* Report Header */}
      <rect x="65" y="60" width="70" height="8" rx="4" fill="#E5E7EB" />
      <rect x="65" y="75" width="50" height="6" rx="3" fill="#E5E7EB" />

      {/* Report Flag Icon */}
      <rect x="65" y="90" width="20" height="20" rx="4" fill="#FEE2E2" />
      <path
        d="M70 100L75 95L80 100"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Report Content Lines */}
      <rect x="95" y="95" width="40" height="6" rx="3" fill="#E5E7EB" />
      <rect x="95" y="105" width="30" height="6" rx="3" fill="#E5E7EB" />

      {/* More Content Lines */}
      <rect x="65" y="120" width="70" height="6" rx="3" fill="#E5E7EB" />
      <rect x="65" y="135" width="70" height="6" rx="3" fill="#E5E7EB" />
      <rect x="65" y="150" width="50" height="6" rx="3" fill="#E5E7EB" />

      {/* Dismiss Symbol */}
      <g transform="translate(130, 70)">
        <circle cx="0" cy="0" r="25" fill="#6B7280" fillOpacity="0.1" />
        <path
          d="M-10 -10L10 10M-10 10L10 -10"
          stroke="#6B7280"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* Checkmark Symbol */}
      <g transform="translate(130, 130)">
        <circle cx="0" cy="0" r="20" fill="#10B981" fillOpacity="0.1" />
        <path
          d="M-8 0L-2 6L8 -4"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default DismissReportIcon;

