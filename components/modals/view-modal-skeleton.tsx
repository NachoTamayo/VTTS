import { Skeleton, Divider, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

export default function ViewModalSkeleton() {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <div>
          <Skeleton className="w-36 h-5" />
          <div className="text-small text-default-500">
            <Skeleton className="w-72 h-4" />
          </div>
        </div>
        <Divider />
      </ModalHeader>

      <ModalBody>
        <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
          <div className="flex flex-nowrap">
            <Skeleton className="w-28 h-5" />
          </div>
          <div className="flex flex-nowrap">
            <Skeleton className="w-28 h-5" />
          </div>
          <div className="flex flex-nowrap">
            <Skeleton className="w-28 h-5" />
          </div>
          <div className="flex flex-nowrap">
            <Skeleton className="w-28 h-5" />
          </div>
          <div className="flex flex-nowrap">
            <Skeleton className="w-32 h-5" />
          </div>
          <div className="flex flex-nowrap">
            <Skeleton className="w-28 h-5" />
          </div>
          <div className="flex flex-nowrap">
            <Skeleton className="w-48 h-5" />
          </div>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
          <div className="flex flex-col max-w-92">
            <Skeleton className="w-full h-24 rounded-lg" />
          </div>
        </div>

        <div className="flex w-full flex-wrap md:flex-nowrap items-end mb-6 md:mb-0 gap-4">
          <div className="flex flex-col w-full">
            <h5 className="w-full mb-2 text-default-500">Comments</h5>
            <Skeleton className="w-full h-36" />
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Skeleton className="w-20 h-8" />
      </ModalFooter>
    </>
  );
}
