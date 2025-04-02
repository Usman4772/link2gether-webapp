"use client";

import { useState } from "react";
import CustomTable from "@/components/Global/CustomTable";
import { getFormattedDate } from "@/utils/frontend/helpers/globals";
import { Card, Input, Button, Tooltip } from "antd";
import useGetDashboardCommunities from "../hooks/useGetDashbaordCommunities";
import Status from "@/components/Global/Status";
import {
  SearchOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Users, TrendingUp, AlertTriangle, UserPlus } from "lucide-react";

function DashboardCommunities() {
  const { data, isLoading } = useGetDashboardCommunities();
  const [searchText, setSearchText] = useState("");

  // Filter data based on search text
  const filteredData = data?.filter((item: any) =>
    item.community_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Community Name",
      dataIndex: "community_name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-medium">
            {text.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-neutral-800 dark:text-white">
              {text}
            </div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">
              Created {getFormattedDate(record.created_at)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (count: number) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
            <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="font-medium">{count}</span>
        </div>
      ),
    },
    {
      title: "Visibility",
      dataIndex: "visibility",
      key: "visibility",
      render: (data: string) => <Status text={data} />,
    },
    {
      title: "Reported Posts",
      dataIndex: "reported_posts",
      key: "reportedPosts",
      render: (count: number) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
          </div>
          <span className="font-medium">{count}</span>
        </div>
      ),
    },
    {
      title: "Join Requests",
      dataIndex: "join_requests",
      key: "joinRequests",
      render: (count: number) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <UserPlus className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
          </div>
          <span className="font-medium">{count}</span>
        </div>
      ),
    },
    {
      title: "Trending",
      key: "trending",
      render: (_: any, record: any) => {
        const trendingScore = record.members + record.join_requests * 2;
        const isTrending =
          trendingScore > (process.env.NEXT_PUBLIC_TRENDING_COUNT || 5);

        return (
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full ${
                isTrending
                  ? "bg-purple-50 dark:bg-purple-900/30"
                  : "bg-neutral-100 dark:bg-neutral-800"
              } flex items-center justify-center`}
            >
              <TrendingUp
                className={`w-3.5 h-3.5 ${
                  isTrending
                    ? "text-purple-500 dark:text-purple-400"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              />
            </div>
            <span
              className={`font-medium ${
                isTrending
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {isTrending ? "Active" : "Normal"}
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <Card className="border border-neutral-200 dark:border-neutral-800 shadow-sm dark:bg-neutral-900 rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-white mb-1">
            Your Communities
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Manage and monitor all your communities in one place
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <CustomTable
          columns={columns}
          data={filteredData || data}
          route={"/admin/community"}
          loading={isLoading}
          className="communities-table"
        />
      </div>

      <style jsx global>{`
        .communities-table .ant-table {
          background: transparent !important;
        }

        .communities-table .ant-table-thead > tr > th {
          background-color: #f9fafb !important;
          color: #4b5563 !important;
          font-weight: 500 !important;
          border-bottom: 1px solid #e5e7eb !important;
        }

        .dark .communities-table .ant-table-thead > tr > th {
          background-color: #1f2937 !important;
          color: #e5e7eb !important;
          border-bottom: 1px solid #374151 !important;
        }

        .communities-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f3f4f6 !important;
        }

        .dark .communities-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #1f2937 !important;
        }

        .communities-table .ant-table-tbody > tr:hover > td {
          background-color: #f9fafb !important;
        }

        .dark .communities-table .ant-table-tbody > tr:hover > td {
          background-color: #111827 !important;
        }

        .communities-table .ant-pagination-item-active {
          border-color: #10b981 !important;
        }

        .communities-table .ant-pagination-item-active a {
          color: #10b981 !important;
        }

        .dark .communities-table .ant-pagination-item-active {
          border-color: #10b981 !important;
          background-color: #10b981 !important;
        }

        .dark .communities-table .ant-pagination-item-active a {
          color: white !important;
        }
      `}</style>
    </Card>
  );
}

export default DashboardCommunities;
