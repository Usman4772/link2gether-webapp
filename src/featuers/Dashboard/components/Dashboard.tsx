"use client";
import Profile from "@/featuers/Dashboard/components/Profile";
import DashboardCommunities from "./DashboardCommunities";
import Header from "./Header";
import KPIMetrics from "./KPIMetrics";
import TopActiveCommunities from "./TopActiveCommunities";
import useFetchUser from "@/hooks/useFetchUser";

export default function Dashboard() {
  const { data } = useFetchUser();
  return (
    <div className="min-h-screen flex justify-between items-start w-full pb-8">
      <div className="w-full space-y-8  pb-12">
        <Header data={data} />
        <KPIMetrics />
        <TopActiveCommunities />
        <DashboardCommunities />
      </div>
    </div>
  );
}
