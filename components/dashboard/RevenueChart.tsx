"use client";

import type { RevenuePoint } from "@/types/dashboard";

import { formatCurrency } from "@/utils/formatCurrency";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface RevenueChartProps {
  data: RevenuePoint[];
}

export default function RevenueChart({
  data,
}: RevenueChartProps) {
  return (
    <div className="mt-10 rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        Revenue Overview
      </h2>

      <div style={{ width: "100%", height: 350 }}>

        <ResponsiveContainer>

          <LineChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickFormatter={(date: string) =>
                new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <YAxis />

            <Tooltip
              formatter={(
                value: string | number | readonly (string | number)[] | undefined
              ) => {
                const numericValue = Array.isArray(value)
                  ? value[0]
                  : value;

                return numericValue == null
                  ? ""
                  : formatCurrency(Number(numericValue));
              }}
            />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}