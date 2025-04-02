import React from "react";

interface ApproveRequestIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const ApproveRequestIcon: React.FC<ApproveRequestIconProps> = ({
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
      <circle cx="100" cy="100" r="80" fill="#ECFDF5" />

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

      {/* Document Lines */}
      <rect x="75" y="60" width="50" height="6" rx="3" fill="#E5E7EB" />
      <rect x="75" y="75" width="50" height="6" rx="3" fill="#E5E7EB" />
      <rect x="75" y="90" width="35" height="6" rx="3" fill="#E5E7EB" />

      {/* Checkboxes */}
      <rect x="70" y="110" width="12" height="12" rx="3" fill="#10B981" />
      <path
        d="M73 116L76 119L79 113"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect x="70" y="130" width="12" height="12" rx="3" fill="#10B981" />
      <path
        d="M73 136L76 139L79 133"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Checkbox Lines */}
      <rect x="90" y="113" width="35" height="6" rx="3" fill="#E5E7EB" />
      <rect x="90" y="133" width="35" height="6" rx="3" fill="#E5E7EB" />

      {/* Approval Stamp */}
      <g transform="translate(100, 100) rotate(-15)">
        <circle cx="0" cy="0" r="25" fill="#10B981" fillOpacity="0.2" />
        <path
          d="M-15 0L-5 10L15 -10"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ApproveRequestIcon;
