"use client";

import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Heading from "@/components/Global/Heading";
import Paragraph from "@/components/Global/Paragraph";
import useGetActiveCommunities from "../hooks/useGetActiveCommunities";
import Loading from "@/components/Global/Loading";

const chartData = [
  { month: "January", members: 186, community_name: "Test Community" },
  { month: "February", members: 305, community_name: "Test " },
  { month: "March", members: 237, community_name: "Test Community" },
  { month: "April", members: 73, community_name: "Test Community" },
  { month: "May", members: 209, community_name: "others" },
];

const chartConfig = {
  members: {
    label: "Members",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const colors = ["#3D8D7A", "#5DEBD7", "#3F4F44", "#27667B", "#16C47F"];

export default function TopActiveCommunities() {

const {data,isLoading}=useGetActiveCommunities()


  return (
    <div className="flex w-full items-start justify-between min-h-[200px]">
      <div className="w-1/2 flex flex-col justify-start ">
        <Heading text="Top Active Communities" size="20px" />
        <Paragraph text="Explore the most engaging communities with the highest posts, comments, and interactions. Active communities drive discussions, encourage participation, and keep the platform lively. Stay updated with trending topics and discover where the most activity is happening!" />
      </div>
      {
       !isLoading &&  data?.chartData?.length>0 ?<ChartContainer config={chartConfig} className="min-h-[200px] w-1/2">
        <BarChart accessibilityLayer data={data?.chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <Bar
            dataKey="members"
            radius={8}
            barSize={60}
            fill="var(--color-members)" // This is a fallback color
          >
            {chartData.map((entry, index) => (
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
        </ChartContainer> : <div className="w-1/2 bg-green-50 rounded-md h-[200px] flex items-center justify-center">{ isLoading ? <Loading/>:"No Data"}</div>
}
    </div>
  );
}
