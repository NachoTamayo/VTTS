"use client";
import {
  ModalBody,
  ModalHeader,
  ModalFooter,
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Skeleton,
} from "@nextui-org/react";

const ElementSkeleton = ({ className }: { className: string }) => {
  return <Skeleton className={`${className} rounded-lg`} />;
};

export const ModifyModalSkeleton = () => {
  const arrayAux = Array.from({ length: 10 });
  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {" "}
        <ElementSkeleton className="w-32 h-8" />
      </ModalHeader>
      <ModalBody>
        <Card shadow="sm" className="min-h-14 max-h-24 overflow-hidden transition-all duration-500 ease-in-out">
          <CardBody>
            <ElementSkeleton className="h-6 w-full" />
          </CardBody>
        </Card>
        <div className="flex flex-row justify-items-end gap-2 mt-1 w-12/12 ">
          <div className="w-7/12"></div>
          <div className="w-2/12 flex items-center justify-end">
            <ElementSkeleton className="w-24 h-6" />
          </div>
          <div className="w-3/12 justify-items-end">
            <ElementSkeleton className="w-full h-6" />
          </div>
        </div>
        <div className="overflow-scroll max-h-[410px] flex justify-center items-center">
          <Table aria-label="Example static collection table" isStriped removeWrapper>
            <TableHeader>
              <TableColumn> </TableColumn>
              <TableColumn>
                <ElementSkeleton className="h-5 w-12 " />{" "}
              </TableColumn>
              <TableColumn>
                <ElementSkeleton className="h-5 w-16  mx-auto " />{" "}
              </TableColumn>
              <TableColumn>
                {" "}
                <ElementSkeleton className="h-5 w-40  mx-auto " />
              </TableColumn>
            </TableHeader>
            <TableBody>
              {arrayAux.map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <ElementSkeleton className="h-5 w-5" />{" "}
                  </TableCell>
                  <TableCell>
                    <ElementSkeleton className="h-5 w-10 " />{" "}
                  </TableCell>
                  <TableCell>
                    <ElementSkeleton className="h-5 w-16  mx-auto " />{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    <ElementSkeleton className="h-5 w-80  mx-auto " />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ModalBody>
      <ModalFooter>
        <Skeleton className={`h-8 w-28 rounded-lg `} />
        <Skeleton className={`h-8 w-28 rounded-lg `} />
      </ModalFooter>
    </>
  );
};
