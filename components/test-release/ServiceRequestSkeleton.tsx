import { Skeleton, Card, CardHeader, Divider, CardBody, Spacer } from "@nextui-org/react";
import { useAuthStore } from "@/helpers/auth-store";

export const ServiceRequestSkeleton = () => {
  const { showDescription } = useAuthStore();
  return (
    <div>
      <Card className="mx-4 my-2">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col min-w-[37%]">
            <div className="flex text-md">
              <Skeleton className="h-5 w-1/4 mb-2 rounded-lg" />
              <Spacer x={2} />
              <Skeleton className="h-5 w-6 rounded-full" />
              <Spacer x={2} />
              <Skeleton className="h-5 w-6 rounded-full" />
              <Spacer x={2} />
              <Skeleton className="h-5 w-6 rounded-full" />
              <Spacer x={2} />
              <Skeleton className="h-5 w-6 rounded-full" />
            </div>
            <Skeleton className="h-4 w-3/4 mt-2 rounded-lg" />
          </div>
          <div className="flex justify-end w-full">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-lg" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-lg" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2 ">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-lg" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-lg" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-24 rounded-lg" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-36 rounded-lg" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Spacer x={4} />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </CardHeader>
        {showDescription ? (
          <>
            <Divider />
            <CardBody>
              <Skeleton className="h-4 w-full mb-2 rounded-lg" />
              <Skeleton className="h-4 w-4/5 rounded-lg" />
            </CardBody>
          </>
        ) : null}
      </Card>
    </div>
  );
};
