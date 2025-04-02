import {
  CommunityIcon,
  MembersIcon,
  ReportIcon,
  RequestIcon,
} from "@/components/icons/icons";
import { Card } from "@/components/ui/card";
import useGetKPIs from "../hooks/useGetKPIs";
import { Skeleton } from "antd";

function KPIMetrics() {
  const { data, isLoading } = useGetKPIs();
  const kpi_metrics = [
    {
      key: "1",
      icon: <CommunityIcon className="w-5 h-5" />,
      title: "Total Communities Created",
      value: data?.total_communities,
      bg_color: "bg-kpi_gray_light",
      icon_bg: "bg-kpi_gray_dark",
      icon_text: "text-kpi_gray_light",
    },
    {
      key: "2",
      icon: <MembersIcon className="w-5 h-5" />,
      title: "Total Members Across Communities",
      value: data?.total_members,
      bg_color: "bg-kpi_green_light",
      icon_bg: "bg-kpi_green_dark",
      icon_text: "text-kpi_green_light",
    },
    {
      key: "3",
      icon: <ReportIcon className="w-5 h-5" />,
      title: "Total Reported Posts",
      value: data?.total_reported_posts,
      bg_color: "bg-kpi_orange_light",
      icon_bg: "bg-kpi_orange_dark",
      icon_text: "text-kpi_orange_light",
    },
    {
      key: "4",
      icon: <RequestIcon className="w-5 h-5" />,
      title: "Pending Join Requests",
      value: data?.total_join_requests,
      bg_color: "bg-kpi_beige_light",
      icon_bg: "bg-kpi_beige_dark",
      icon_text: "text-kpi_beige_light",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <Card key={index} className="border shadow-sm overflow-hidden">
            <div className="p-5">
              <div className="flex items-start">
                <Skeleton.Avatar
                  active
                  size="large"
                  shape="circle"
                  className="flex-shrink-0"
                />
                <div className="ml-4 flex flex-col gap-2">
                  <Skeleton.Input active size="small" className="w-3/4 " />
                  <Skeleton.Input active size="large" className="w-1/2" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {kpi_metrics && kpi_metrics.length > 0
        ? kpi_metrics.map((metric) => (
            <Card
              key={metric.key}
              className={`overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-md`}
            >
              <div className={`${metric.bg_color} p-5 h-full`}>
                <div className="flex items-start">
                  <div
                    className={`${metric.icon_bg} rounded-full w-12 h-12 flex items-center justify-center shadow-sm`}
                  >
                    <div className={metric.icon_text}>{metric.icon}</div>
                  </div>

                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-neutral-600 mb-1">
                      {metric.title}
                    </h3>
                    <div className="text-3xl font-bold text-neutral-800">
                      {metric.value || 0}
                    </div>
                  </div>
                </div>

                {/* Progress indicator - visual element */}
                <div className="mt-4 w-full bg-white/30 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${metric.icon_bg}`}
                    style={{
                      width: `${Math.min(100, (metric.value || 0) % 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </Card>
          ))
        : null}
    </div>
  );
}

export default KPIMetrics;
