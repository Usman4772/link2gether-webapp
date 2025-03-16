import { CommunityIcon, MembersIcon, ReportIcon, RequestIcon } from '@/components/icons/icons';
import { Card } from '@/components/ui/card';
import React from 'react'

function KPIMetrics() {

      const kpi_metrics = [
        {
          key: "1",
          icon: <CommunityIcon className="w-5 h-5" />,
          title: "Total Communities Created",
          value: "18",
          bg_color: "bg-kpi_gray_light",
          icon_bg: "bg-kpi_gray_dark",
          icon_text: "text-kpi_gray_light",
        },
        {
          key: "2",
          icon: <MembersIcon className="w-5 h-5" />,
          title: "Total Members Across Communities",
          value: "18",
          bg_color: "bg-kpi_green_light",
          icon_bg: "bg-kpi_green_dark",
          icon_text: "text-kpi_green_light",
        },
        {
          key: "1",
          icon: <ReportIcon className="w-5 h-5" />,
          title: "Total Reported Posts",
          value: "18",
          bg_color: "bg-kpi_orange_light",
          icon_bg: "bg-kpi_orange_dark",
          icon_text: "text-kpi_orange_light",
        },

        {
          key: "1",
          icon: <RequestIcon className="w-5 h-5" />,
          title: "Pending Join Requests",
          value: "18",
          bg_color: "bg-kpi_beige_light",
          icon_bg: "bg-kpi_beige_dark",
          icon_text: "text-kpi_beige_light",
        },
      ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {kpi_metrics && kpi_metrics.length > 0
        ? kpi_metrics.map((metric) => {
            return (
              <Card
                className={`py-11 px-5  ${metric.bg_color} border-none outline-none`}
              >
                <div className="flex justify-start  flex-col gap-4">
                  <div
                    className={`p-3 ${metric.icon_bg} rounded-full w-11 h-11 flex items-center justify-center`}
                  >
                    {metric.icon}
                  </div>
                  <div className="text-sm text-gray-500">{metric.title}</div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                </div>
              </Card>
            );
          })
        : null}
    </div>
  );
}

export default KPIMetrics