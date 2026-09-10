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
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="name" tickLine={false} axisLine={false} />

          <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

          <Tooltip />

          <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
