import { ServiceRequestSkeleton } from "./ServiceRequestSkeleton";

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
