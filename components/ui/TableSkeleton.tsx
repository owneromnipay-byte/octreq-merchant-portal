import Skeleton from "./skeleton";

interface Props {
  rows?: number;
  columns?: number;
}

export default function TableSkeleton({
  rows = 6,
  columns = 5,
}: Props) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <Skeleton className="h-7 w-48" />

      <div className="mt-6 overflow-hidden">

        <table className="w-full">

          <thead>

            <tr>

              {Array.from({ length: columns }).map((_, index) => (
                <th
                  key={index}
                  className="pb-4 text-left"
                >
                  <Skeleton className="h-4 w-24" />
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {Array.from({ length: rows }).map((_, row) => (
              <tr key={row}>

                {Array.from({ length: columns }).map((_, col) => (
                  <td
                    key={col}
                    className="py-4"
                  >
                    <Skeleton className="h-5 w-full" />
                  </td>
                ))}

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}