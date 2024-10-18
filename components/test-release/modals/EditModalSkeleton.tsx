import { Skeleton, Divider, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

export default function EditModalSkeleton() {
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <div>
          <Skeleton className="w-1/12 h-8 rounded-lg" />
          <Skeleton className="w-5/12 h-4 mt-1 rounded-lg" />
        </div>
        <Divider />
      </ModalHeader>

      <ModalBody>
        <div className="flex w-full flex-row gap-4 ">
          <Skeleton className="w-28 h-14  rounded-lg" />
          <Skeleton className="w-28 h-14  rounded-lg" />
          <Skeleton className="w-28 h-14  rounded-lg" />
          <Skeleton className="w-28 h-14  rounded-lg" />
        </div>
        <Divider className="my-4" />
        <div className="flex w-full flex-row gap-4 ">
          <Skeleton className="w-60 h-12  rounded-lg" />
          <Skeleton className="w-28 h-12  rounded-lg" />
          <Skeleton className="w-60 h-12  rounded-lg" />
        </div>
        <div className="flex w-full flex-row gap-4 ">
          <Skeleton className="w-full h-28  rounded-lg" />
        </div>
        <div className="flex w-full flex-row gap-4 ">
          <Skeleton className="w-full h-72  rounded-lg" />
        </div>
      </ModalBody>

      <ModalFooter>
        <Skeleton className="w-20 h-8 rounded-lg" />
        <Skeleton className="w-20 h-8 rounded-lg" />
      </ModalFooter>
    </>
  );
}
