"use client";

import Heading from "@/components/Global/Heading";
import { Card } from "@/components/ui/card";
import Profile from "@/featuers/Dashboard/components/Profile";
import { Table } from "antd";

import Header from "./Header";
import KPIMetrics from "./KPIMetrics";
import TopActiveCommunities from "./TopActiveCommunities";
import DotDropdown from "@/components/Global/DotDropdown";
import CustomTable from "@/components/Global/CustomTable";

const columns = [
  {
    title: "Community Name",
    dataIndex: "task",
    key: "task",
  },
  {
    title: "Members Count",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Visibility",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Reported Posts",
  },
  {
    title: "Created at",
  },
  {
    title: "Actions",
    render: () => {
      return <DotDropdown items={[]}/>
    }
  }
];

const tasks = [
  {
    key: "1",
    id:"1",
    task: "Product Review for UI8 Market",
    status: "In progress",
    time: "4h",
  },
  {
    key: "2",
    id:"2",
    task: "UX Research for Product",
    status: "On hold",
    time: "8h",
  },
  {
    key: "3",
    id:"3",
    task: "App design and development",
    status: "Done",
    time: "32h",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen flex justify-between items-start w-full pb-8">
      <div className="w-3/4 space-y-8 border-r-[1px] border-gray-200 pr-4 pb-12">
        <Header />
        <KPIMetrics />
        <TopActiveCommunities />

        {/* Tasks Table */}
        <Card className="p-6 outline-none border-none shadow-none">
          <div className="flex justify-between items-center mb-4">
            <Heading text="Your Communities" size="20px"/>
          </div>
          <CustomTable columns={columns} data={tasks} route={"/admin/community"}/>
        </Card>
      </div>
      <Profile />
    </div>
  );
}
