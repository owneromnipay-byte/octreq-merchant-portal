import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
}: StatCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">

        <CardTitle className="text-sm font-medium text-slate-500">
          {title}
        </CardTitle>

        {icon}

      </CardHeader>

      <CardContent>

        <div className="text-3xl font-bold">
          {value}
        </div>

        {subtitle && (
          <p className="mt-2 text-xs text-slate-500">
            {subtitle}
          </p>
        )}

      </CardContent>
    </Card>
  );
}