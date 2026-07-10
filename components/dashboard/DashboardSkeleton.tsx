import Skeleton from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div>

      <Skeleton className="h-10 w-60" />

      <Skeleton className="mt-3 h-5 w-80" />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {[1, 2, 3, 4].map((card) => (
          <div
            key={card}
            className="rounded-xl bg-white p-6 shadow"
          >
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-6 h-8 w-40" />
          </div>
        ))}

      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <Skeleton className="h-6 w-48" />

        <Skeleton className="mt-6 h-80 w-full" />

      </div>

      <div className="mt-10 rounded-xl bg-white p-6 shadow">

        <Skeleton className="h-6 w-52" />

        <div className="mt-6 space-y-4">

          {[1, 2, 3, 4, 5].map((row) => (
            <Skeleton
              key={row}
              className="h-12 w-full"
            />
          ))}

        </div>

      </div>

    </div>
  );
}