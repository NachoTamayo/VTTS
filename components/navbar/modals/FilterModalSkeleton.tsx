import { Skeleton } from "@nextui-org/react";

export const FilterModalSkeleton = () => {
  return (
    <>
      <div className="flex flex-row gap-2 max-h-12">
        <div className=" rounded-lg max-h-12 max-w-xs w-2/12">
          <Skeleton className="rounded-lg h-12" />
        </div>
        <div className="h-48 rounded-lg h-12 max-w-xs w-3/12">
          {" "}
          <Skeleton className="rounded-lg h-12" />
        </div>
        <div className="h-48 rounded-lg h-12 max-w-xs w-2/12">
          {" "}
          <Skeleton className="rounded-lg h-12" />
        </div>
        <div className="h-48 rounded-lg h-12 max-w-xs w-24">
          {" "}
          <Skeleton className="rounded-lg h-12" />
        </div>
        <div className="h-48 rounded-lg h-12 max-w-xs w-3/12">
          {" "}
          <Skeleton className="rounded-lg h-12" />
        </div>
      </div>
      <div className="flex flex-row max-h-12 gap-2">
        <div className="h-48 rounded-lg h-12 max-w-xs w-6/12">
          {" "}
          <Skeleton className="rounded-lg h-12" />
        </div>
        <div className="h-48 rounded-lg h-12 max-w-xs w-4/12">
          {" "}
          <Skeleton className="rounded-lg h-12" />
        </div>
        <div className="h-48 rounded-lg h-12 max-w-xs w-2/12">
          {" "}
          <Skeleton className="rounded-lg h-12" />
        </div>
      </div>
    </>
  );
};
