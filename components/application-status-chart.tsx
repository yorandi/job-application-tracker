"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  name: string;
  value: number;
};

type ApplicationStatusChartProps = {
  data: ChartData[];
};

export default function ApplicationStatusChart({
  data,
}: ApplicationStatusChartProps) {
  return (
    <div className="h-64 w-full min-w-0 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            stroke="#27272a"
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 11 }}
            minTickGap={12}
          />

          <YAxis
            width={32}
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
          />

          <Tooltip
            cursor={{ fill: "#27272a" }}
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #3f3f46",
              borderRadius: 12,
              color: "#f4f4f5",
            }}
          />

          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
