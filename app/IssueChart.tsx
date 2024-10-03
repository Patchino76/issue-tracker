"use client";
import React from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Card } from "@radix-ui/themes";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}
const chartConfig = {
  value: {
    label: "Value",
    color: "red",
  },
} satisfies ChartConfig;

const IssueChart = ({ open, closed, inProgress }: Props) => {
  const chartData = [
    { status: "Open", value: open },
    { status: "In Progress", value: inProgress },
    { status: "Closed", value: closed },
  ];
  return (
    <Card>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis dataKey="status" />
          <YAxis domain={[0, "dataMax"]} />
          <Bar dataKey="value" fill="green" radius={4} barSize={40}/>
        </BarChart>
      </ChartContainer>
    </Card>
  );
};
export default IssueChart;
