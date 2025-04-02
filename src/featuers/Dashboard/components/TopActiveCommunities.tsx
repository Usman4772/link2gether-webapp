"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useGetActiveCommunities from "../hooks/useGetActiveCommunities";
import { Card } from "@/components/ui/card";
import { BarChart2, TrendingUp } from "lucide-react";
import { Skeleton } from "antd";

const chartConfig = {
  members: {
    label: "Members",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const colors = ["#3D8D7A", "#5DEBD7", "#3F4F44", "#27667B", "#16C47F"];

export default function TopActiveCommunities() {
  const { data, isLoading } = useGetActiveCommunities();

  return (
    <Card className="p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col lg:flex-row w-full gap-6">
        {/* Left side - Text content */}
        <div className="lg:w-1/2 flex flex-col justify-start">
          <div className="flex items-center mb-3">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg mr-3">
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-800 dark:text-white">
              Top Active Communities
            </h3>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4">
            Explore the most engaging communities with the highest posts,
            comments, and interactions. Active communities drive discussions,
            encourage participation, and keep the platform lively.
          </p>

          {!isLoading && data?.chartData?.length > 0 && (
            <div className="hidden lg:flex flex-col space-y-3 mt-2">
              <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Top Communities
              </div>
              {data?.chartData?.slice(0, 3).map((item:any, index:any) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  ></div>
                  <span className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                    {item.community_name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right side - Chart */}
        <div className="lg:w-1/2 h-[250px] flex items-center justify-center">
          {isLoading ? (
            <div className="w-full h-full flex flex-col justify-center">
              <Skeleton.Input active size="small" className="w-1/3 mb-4" />
              <Skeleton.Input active className="w-full h-[180px]" />
            </div>
          ) : data?.chartData?.length > 0 ? (
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data?.chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    vertical={false}
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                  />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                    stroke="#9ca3af"
                  />
                  <Bar
                    dataKey="members"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                    fill="var(--color-members)"
                  >
                    {data?.chartData.map((entry:any, index:any) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Bar>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        labelKey="month"
                        labelFormatter={(value, payload) => {
                          if (payload && payload.length > 0) {
                            return payload[0].payload.community_name;
                          }
                          return value;
                        }}
                      />
                    }
                    cursor={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-800/30 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-700">
              <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-full mb-3">
                <BarChart2 className="h-6 w-6 text-neutral-400 dark:text-neutral-500" />
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">
                No community data available
              </p>
              <p className="text-neutral-400 dark:text-neutral-500 text-xs mt-1">
                Communities will appear here once they become active
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
