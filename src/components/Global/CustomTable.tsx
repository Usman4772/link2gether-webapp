"use client";
import type { TablePaginationConfig } from "antd";
import { Table } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Loading from "./Loading";

export type TableDataItem = {
    id: string;
    [key: string]: any;
};

export type TableColumnType<T> = {
  title: React.ReactNode;
  dataIndex?: string;
  key?: string;
  render?: (text: any, record: T, index: number) => React.ReactNode;
  [key: string]: any;
};

interface CustomTableProps<T extends TableDataItem> {
  NoDataMessage?: React.ReactNode | null;
  className?: string;
  columns: TableColumnType<T>[];
  data?: T[];
  currentPage?: number;
  totalItems?: number;
  handlePageChange?: (page: number, pageSize: number) => void;
  loading?: boolean;
  pageSize?: number;
  footer?: () => React.ReactNode;
  route?: string | false;
  scrollable?: boolean;
}

function CustomTable<T extends TableDataItem>({
  NoDataMessage = null,
  className = "",
  columns,
  data = [],
  currentPage,
  totalItems = 0,
  handlePageChange = () => {},
  loading = false,
    pageSize,
  route = false,
  scrollable = false,
}: CustomTableProps<T>) {
  const router = useRouter();
  const defaultPageSizeRef = useRef(pageSize);

  useEffect(() => {
    if (!defaultPageSizeRef.current) {
      defaultPageSizeRef.current = pageSize;
    }
  }, [pageSize]);

  const shouldPaginate = totalItems > 6;
  const paginationConfig: TablePaginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: totalItems,
    showSizeChanger: true,
    pageSizeOptions: ["6", "15", "25", "50", "75", "100"],
    onChange: (page, pageSize) => {
      handlePageChange(page, pageSize);
    },
  };

  return (
    <Table<T>
      className={className}
      style={{ cursor: route ? "pointer" : "default" }}
      loading={{
        spinning: loading,
        indicator: <Loading />,
      }}
      columns={columns as any}
      scroll={scrollable ? { x: 1300 } : undefined}
      dataSource={data}
      locale={
        NoDataMessage
          ? {
              emptyText: (
                <div className="flex flex-col items-center justify-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-4 text-yellow-500"
                  >
                    <path
                      d="M24 4L4 40H44L24 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 32V33"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M24 16V26"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="text-sm font-medium text-yellow-700">
                    {NoDataMessage || "No data available"}
                  </p>
                </div>
              ),
            }
          : undefined
      }
      pagination={shouldPaginate ? paginationConfig : false}
      onRow={
        route
          ? (record) => ({
              onClick: () => {
                router.push(`${route}/${record?.id}`);
              },
            })
          : undefined
      }
    />
  );
}

export default CustomTable;
