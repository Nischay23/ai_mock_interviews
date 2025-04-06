// app/feedback/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedbackLoading() {
  return (
    <div className="flex flex-col gap-8 p-8 min-h-screen">
      {/* Hero or header skeleton */}
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-10 w-1/2 rounded" />
        <Skeleton className="h-6 w-1/3 rounded" />
      </div>
      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-40 w-full rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
