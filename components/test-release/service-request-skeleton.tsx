import { Skeleton, Card, CardHeader, Divider, CardBody } from "@nextui-org/react";

export const ServiceRequestSkeleton = () => {
  return (
    <div>
      <Card className="mx-4 my-2">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col min-w-[50%]">
            <Skeleton className="h-5 w-1/4 mb-2 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg" />
          </div>
          <div className="flex flex-col min-w-[9%]">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col min-w-[7%]">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-12 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col min-w-[5%]">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-8 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col min-w-[8%]">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col min-w-[8%]">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-24 rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col min-w-[2%]">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col min-w-[2%]">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
          <div className="flex flex-col min-w-[2%]">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Skeleton className="h-4 w-full mb-2 rounded-lg" />
          <Skeleton className="h-4 w-4/5 rounded-lg" />
        </CardBody>
      </Card>
    </div>
  );
};
