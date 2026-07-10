import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl bg-white p-12 shadow">

      <div className="flex flex-col items-center text-center">

        <div className="rounded-full bg-slate-100 p-5">
          <Icon
            size={42}
            className="text-slate-400"
          />
        </div>

        <h2 className="mt-6 text-2xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 max-w-md text-slate-500">
          {description}
        </p>

        {action && (
          <div className="mt-8">
            {action}
          </div>
        )}

      </div>

    </div>
  );
}