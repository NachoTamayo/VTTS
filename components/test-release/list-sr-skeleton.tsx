import { ServiceRequestSkeleton } from "./service-request-skeleton";

export const ListSrSkeleton = () => {
  const numRows = 15;
  return (
    <>
      {Array.from({ length: numRows }).map((_, index) => (
        <ServiceRequestSkeleton key={index} />
      ))}
    </>
  );
};
